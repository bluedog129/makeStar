import { useEffect, useState } from "react";
import { getOwnAlbumList } from "../api/album";
import { AlbumListResponse } from "../types/album";
import PocaAlbumInfo from "./PocaAlbumInfo";
import AlbumSwiper from "./AlbumSwiper";
import useAlbumStore from "../store/albumStore";
import {
  Container,
  ErrorText,
} from "../styles/PocaAlbumContainer.styles";
import { LoaderContainer, Loader } from "../styles/Loader.styles";
import { mockAlbumData } from "../mocks/albumData";

import newjeans from "../assets/images/newjeans.png";
import aespa from "../assets/images/aespa.png";
import ive from "../assets/images/ive.png";
import lesserafim from "../assets/images/lesserafim.png";
import seventeen from "../assets/images/seventeen.png";

const fallbackImages: { [key: string]: string } = {
  NewJeans: newjeans,
  aespa: aespa,
  IVE: ive,
  "LE SSERAFIM": lesserafim,
  SEVENTEEN: seventeen,
  default: newjeans,
};

const PocaAlbumContainer = () => {
  const [albumData, setAlbumData] = useState<AlbumListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setAlbums } = useAlbumStore();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const data = await getOwnAlbumList();

        if (data && data.result && data.album_list) {
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
              coverImage = fallbackImages[artistName] || fallbackImages.default;
            }

            const processedAlbum = {
              ...album,
              coverImage,
              isUpdate: album.version_code > 1
            };

            return processedAlbum;
          });

          // API 데이터 store에 저장
          setAlbums(processedAlbums);
          setAlbumData({
            ...data,
            album_list: processedAlbums
          });
        }
      } catch (err) {
        console.error("API 호출 실패, 더미 데이터를 사용합니다:", err);

        const processedMockData = mockAlbumData.album_list.map((album) => {
          const artistName = album.artist?.name || "";
          const coverImage = fallbackImages[artistName] || fallbackImages.default;
          
          return {
            ...album,
            coverImage,
            isUpdate: album.version_code > 1
          };
        });

        setAlbumData({
          ...mockAlbumData,
          album_list: processedMockData
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
      <AlbumSwiper albums={albumData.album_list} onSlideChange={setCurrentIndex} />
      <PocaAlbumInfo
        title={currentAlbum.title}
        artist={currentAlbum.artist?.name || ""}
        releasedAt={currentAlbum.released_at || ""}
      />
    </Container>
  );
};

export default PocaAlbumContainer;
