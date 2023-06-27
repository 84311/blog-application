import {useEffect, useState} from "react";
import {getBlogDataRequest} from "../../service";
import {Container} from "react-bootstrap";
import {CategoriesComponent} from "./Posts/CategoriesComponent";
import SearchBar from "./SearchBar";
import {PostComponent} from "./Posts/PostComponent";
import {isPostContainsSearchQuery} from "./Utils/utils";
import {AddPostComponent} from "./Posts/AddPostComponent";

export const MainContentComponent = () => {
  const [categoriesData, setCategoriesData] = useState(null);
  const [welcomingPostData, setWelcomingPostData] = useState(null);
  const [filteredPostsData, setFilteredPostsData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("DATE_DSC");

  useEffect(() => {

    getBlogDataRequest(sortBy).then(blogData => {

      setCategoriesData(blogData.data.categories);
      setWelcomingPostData(blogData.data.posts.find(p => p.postType === "WELCOMING"));
      setFilteredPostsData(blogData.data.posts
        .filter(p => p.postType !== "WELCOMING" && isPostContainsSearchQuery(p, searchQuery)));

    });

  }, [searchQuery, sortBy]);

  function renderPostsForSearchQuery() {
    return <>
      {filteredPostsData.length > 0 ? (
        filteredPostsData.map((post) => (
            <PostComponent postData={post} key={post.id}/>
          )
        )
      ) : (
        <p className="text-danger">Nothing found</p>
      )
      }
    </>;
  }

  return (
    <>
      {filteredPostsData &&
        <Container className="my-4 p-3 main">

          <div className="d-flex flex-column flex-lg-row">
            <PostComponent postData={welcomingPostData}/>
            <CategoriesComponent categoriesData={categoriesData}/>
          </div>

          <SearchBar setSortBy={setSortBy} setSearchQuery={setSearchQuery}/>
          <AddPostComponent setSortBy={setSortBy}/>

          {renderPostsForSearchQuery()}

        </Container>
      }
    </>
  )
}
