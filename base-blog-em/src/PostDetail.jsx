import { useQuery , useMutation} from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  // const data = [];
  const { data, isError, isLoading, error } = useQuery(
    ["commments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((postId)=>deletePost(postId))
const updataMutation = useMutation((postId)=>updatePost(postId))
  if (isLoading) return <h3>Loading....</h3>;

  if (isError)
    return (
      <>
        <h3>에러임 ㅋ</h3>
        <p>{error.toString()}</p>
      </>
    );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isError && <p style={{color:"red"}}>Error deleting the Post</p> }
        {deleteMutation.isLoading && <p style={{color:"blue"}}>Deleting the post</p> }
        {deleteMutation.isSuccess && <p style={{color:"green"}}>Success deleting the Post</p> }
        <button onClick={()=>updataMutation.mutate(post.id)}>Update title</button>
        {updataMutation.isError && <p style={{color:"red"}}>Error updating the Post</p> }
        {updataMutation.isLoading && <p style={{color:"blue"}}>Updating the post</p> }
        {updataMutation.isSuccess && <p style={{color:"green"}}>Success updating the Post</p> }

      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
