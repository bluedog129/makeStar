import { useEffect, useState } from "react";
import { getOwnAlbumList } from "../api/album";
import { AlbumListResponse } from "../types/album";
import PocaAlbumInfo from "./PocaAlbumInfo";
import AlbumSwiper from "./AlbumSwiper";
import {
  Container,
  LoadingText,
  ErrorText,
} from "../styles/PocaAlbumContainer.styles";
import { mockAlbumData } from "../mocks/albumData";

// Import fallback images
import newjeans from "../assets/images/newjeans.png";
import aespa from "../assets/images/aespa.png";
import ive from "../assets/images/ive.png";
import lesserafim from "../assets/images/lesserafim.png";
import seventeen from "../assets/images/seventeen.png";

// Fallback images mapping
const fallbackImages: { [key: string]: string } = {
  NewJeans: newjeans,
  aespa: aespa,
  IVE: ive,
  "LE SSERAFIM": lesserafim,
  SEVENTEEN: seventeen,
  // Add a default fallback
  default: newjeans,
};

const PocaAlbumContainer = () => {
  const [albumData, setAlbumData] = useState<AlbumListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        const data = await getOwnAlbumList();

        // Process the API data to add coverImage property
        if (data && data.result && data.album_list) {
          const processedAlbums = data.album_list.map((album) => {
            // Try to get image from published_album_list first
            let coverImage = null;

            if (
              album.published_album_list &&
              album.published_album_list.length > 0
            ) {
              // Use box_image_url or nfc_image_url if available
              coverImage =
                album.published_album_list[0].box_image_url ||
                album.published_album_list[0].nfc_image_url;
            }

            // If no image was found, use fallback based on artist name
            if (!coverImage) {
              const artistName = album.artist?.name || "";
              coverImage = fallbackImages[artistName] || fallbackImages.default;
            }

            // Add isUpdate property (you may want to base this on some logic)
            const isUpdate = album.version_code > 1;

            return {
              ...album,
              coverImage,
              isUpdate,
            };
          });

          // Update the data with processed albums
          data.album_list = processedAlbums;
        }

        setAlbumData(data);
      } catch (err) {
        console.error("API 호출 실패, 더미 데이터를 사용합니다:", err);

        // Process mock data similarly
        const processedMockData = {
          ...mockAlbumData,
          album_list: mockAlbumData.album_list.map((album) => {
            const artistName = album.artist?.name || "";
            const coverImage =
              fallbackImages[artistName] || fallbackImages.default;
            const isUpdate = album.version_code > 1;

            return {
              ...album,
              coverImage,
              isUpdate,
            };
          }),
        };

        setAlbumData(processedMockData);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, []);

  if (loading) {
    return <LoadingText>로딩 중...</LoadingText>;
  }

  if (!albumData || !albumData.result) {
    return <ErrorText>앨범 정보가 없습니다.</ErrorText>;
  }

  const albums = albumData.album_list;
  if (albums.length === 0) {
    return <ErrorText>앨범 정보가 없습니다.</ErrorText>;
  }

  const currentAlbum = albums[currentIndex];

  return (
    <Container>
      <AlbumSwiper albums={albums} onSlideChange={setCurrentIndex} />
      <PocaAlbumInfo
        title={currentAlbum.title}
        artist={currentAlbum.artist?.name || ""}
        releasedAt={currentAlbum.released_at || ""}
      />
    </Container>
  );
};

export default PocaAlbumContainer;
