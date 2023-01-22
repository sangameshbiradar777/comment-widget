import CommentBox from "../components/CommentBox";
import Comments from "../components/Comments";
import SortBy from "../components/SortBy";
import Navbar from "../components/Navbar";

const Home = () => (
  <main className="main">
    <Navbar />
    <header className="main__header">
      <CommentBox />
      <SortBy />
    </header>
    <Comments />
  </main>
);

export default Home;