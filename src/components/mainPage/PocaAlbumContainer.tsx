import { useEffect, useState } from "react";
import { getOwnAlbumList } from "@/api/album";
import { AlbumListResponse } from "@/types/album";
import { FallbackImageMap } from "@/types/image";
import PocaAlbumInfo from "@/components/mainPage/PocaAlbumInfo";
import AlbumSwiper from "@/components/mainPage/AlbumSwiper";
import useAlbumStore from "@/store/albumStore";
import { Container, ErrorText } from "@/styles/PocaAlbumContainer.styles";
import { LoaderContainer, Loader } from "@/styles/Loader.styles";
import { mockAlbumData } from "@/mocks/albumData";
import NotificationMessage from "@/components/common/NotificationMessage";
import noImage from "@/assets/images/noImage.png";

import newjeans from "@/assets/images/newjeans.png";
import aespa from "@/assets/images/aespa.png";
import ive from "@/assets/images/ive.png";
import lesserafim from "@/assets/images/lesserafim.png";
import seventeen from "@/assets/images/seventeen.png";

const fallbackImages: FallbackImageMap = {
  NewJeans: newjeans,
  aespa: aespa,
  IVE: ive,
  "LE SSERAFIM": lesserafim,
  SEVENTEEN: seventeen,
  default: newjeans,
} as const;

const PocaAlbumContainer = () => {
  const [albumData, setAlbumData] = useState<AlbumListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUsingDummyData, setIsUsingDummyData] = useState(false);
  const { setAlbums } = useAlbumStore();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const data = await getOwnAlbumList();

        if (data && data.result && data.album_list) {
          setIsUsingDummyData(false);
          const processedAlbums = data.album_list.map((album) => {
            let coverImage = null;

            if (
              album.published_album_list &&
              album.published_album_list.length > 0
            ) {
              coverImage =
                album.published_album_list[0].box_image_url ||
                album.published_album_list[0].nfc_image_url;
            }

            if (!coverImage) {
              const artistName = album.artist?.name || "";
              coverImage = fallbackImages[artistName] || noImage;
            }

            const processedAlbum = {
              ...album,
              coverImage,
              isUpdate: album.version_code > 1,
            };

            return processedAlbum;
          });

          // API 데이터 store에 저장
          setAlbums(processedAlbums);
          setAlbumData({
            ...data,
            album_list: processedAlbums,
          });
        }
      } catch (err) {
        console.error("API 호출 실패, 더미 데이터를 사용합니다:", err);
        setIsUsingDummyData(true);

        const processedMockData = mockAlbumData.album_list.map((album) => {
          const artistName = album.artist?.name || "";
          const coverImage = fallbackImages[artistName] || noImage;

          return {
            ...album,
            coverImage,
            isUpdate: album.version_code > 1,
          };
        });

        setAlbumData({
          ...mockAlbumData,
          album_list: processedMockData,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, []);

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (!albumData || !albumData.result) {
    return <ErrorText>앨범 정보가 없습니다.</ErrorText>;
  }

  const currentAlbum = albumData.album_list[currentIndex];

  return (
    <Container>
      <AlbumSwiper
        albums={albumData.album_list}
        onSlideChange={setCurrentIndex}
      />
      <PocaAlbumInfo
        title={currentAlbum.title}
        artist={currentAlbum.artist?.name || ""}
        releasedAt={currentAlbum.released_at || ""}
      />
      {isUsingDummyData && (
        <NotificationMessage
          message={`보유하신 앨범이 없거나 불러오지 못하여
          샘플 앨범을 보여드리고 있습니다.`}
        />
      )}
    </Container>
  );
};

export default PocaAlbumContainer;
