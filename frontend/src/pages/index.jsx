import Navbar from "../components/navbar/navbar";
import Feed from "../components/feed/Feed";
import NewPostForm from "../components/post_create/NewPostForm";


const Index = () => {


  return (

    <div>
        <Navbar/>
      <p>Welcome to AceBook</p>
      <NewPostForm/>
      <Feed/>


    </div>
  );
};

export default Index;