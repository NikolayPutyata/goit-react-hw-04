import { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { useState } from "react";
import searchImagesForTopic from "./search-img-api.js";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

const App = () => {
  const [serverData, setServerData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [modal, setModal] = useState(false);

  const submitFu = async (newTopic) => {
    try {
      setError(false);
      setLoader(true);
      setTopic(newTopic);
      setPage(1);

      const data = await searchImagesForTopic(newTopic, page);
      setServerData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const loadMoreFu = async () => {
    try {
      setLoader(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const data = await searchImagesForTopic(topic, nextPage);
      setServerData((prev) => [...prev, ...data]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={submitFu} />
      <Toaster />
      {serverData.length > 0 && <ImageGallery galleryList={serverData} />}
      {serverData.length > 0 && <LoadMoreButton loadMoreFu={loadMoreFu} />}
      {error && <ErrorMessage />}
      {loader && <Loader />}
      {modal && <ImageModal />}
    </>
  );
};

export default App;
