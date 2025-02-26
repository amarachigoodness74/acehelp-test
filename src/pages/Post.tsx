import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "../components/PageLoader";
import { fetchData } from "../utils";
import { IComment } from "../types/comment";

const Post = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      fetchData(`https://jsonplaceholder.typicode.com/posts/${id!}`),
    enabled: !!id, // Only run query if id is available
  });

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["user", post?.userId], // Ensure post?.userId is used
    queryFn: () =>
      fetchData(`https://jsonplaceholder.typicode.com/users/${post?.userId}`),
    enabled: !!post?.userId, // Only run if post?.userId is available
  });

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ["comment", post?.id], // Ensure post?.id is used
    queryFn: () => fetchData(`https://jsonplaceholder.typicode.com/comments`),
    enabled: !!post?.id, // Only run if post?.id is available
  });

  const [newComment, setNewComment] = useState("");

  if (isLoading || userLoading || commentsLoading) return <PageLoader />;
  if (isError || userError || commentsError)
    return (
      <p className="flex items-center justify-center h-screen">
        Error: There was an error fetching post!
      </p>
    );
  if (!post) return <p className="text-center">Post not found.</p>;

  const filteredComments = comments
    ? comments.filter((comment: IComment) => comment.postId === Number(id))
    : [];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <div className="flex items-center mt-4">
          <CircleUserRound className="w-10 h-10 rounded-full mr-3 " />
          <div className="flex flex-col justify-between">
            <span className="text-sm text-gray-600">by {user.name}</span>
            <Link to={user.website}>
              <span className="text-xs text-gray-400">Website</span>
            </Link>
          </div>
        </div>
        <p className="mt-6 text-lg text-gray-700">{post.body}</p>
        <p className="mt-6 text-lg text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero ad,
          quas et esse nihil consequatur dicta repellendus hic autem
          reprehenderit deleniti rerum mollitia nesciunt officia quae totam
          voluptatibus? Temporibus numquam, repudiandae quasi optio perferendis
          iusto debitis delectus soluta fuga a accusantium inventore ut nihil
          laboriosam necessitatibus? Doloremque, provident. Nulla sequi eligendi
          deleniti a odit magnam modi vero quis repudiandae voluptatem? Quia,
          reiciendis vitae tempore ratione exercitationem accusantium quasi ipsa
          expedita in maxime quo libero error dolorem provident nesciunt
          sapiente repellat! Vero rerum
        </p>
        <p className="mt-6 text-lg text-gray-700">
          {" "}
          assumenda molestias accusantium officia, error ipsam perferendis saepe
          sit possimus aut quo ex autem ducimus pariatur tenetur debitis dolores
          praesentium blanditiis incidunt provident maxime beatae magni tempora?
          Exercitationem at possimus officiis commodi ipsam sapiente voluptatem
          ut enim hic praesentium molestias, itaque voluptate nulla laboriosam
          fugiat quibusdam a distinctio adipisci dignissimos tempore maxime
          minus dicta magni excepturi. Ex perferendis voluptatibus sed, et
          itaque eius, harum saepe, exercitationem nemo quasi corporis.
          Laudantium nemo quas aut eos mollitia quos cumque, dolorem ex corporis
          minus cupiditate dicta maiores quae quisquam consequatur facere
          exercitationem{" "}
        </p>
        <p className="mt-6 text-lg text-gray-700">
          blanditiis sit veritatis. Deleniti praesentium ullam dolores commodi
          nam perferendis quam consequatur mollitia tempora molestias obcaecati
          quod reiciendis culpa expedita magnam odit in, ex laboriosam,
          quibusdam nulla consectetur, exercinesciunt veritatis error quisquam
          maiores repellendus facilis nemo, numae necessitatibus eum fugiat
          reiciendis, quam dolores, praesentium soluta nulla ipsa suscipit iure
          ratione vitae eveniet inventore repellendus ad expedita repellat.
          Nobis quo iste eum quae minima illo quos maxime laboriosam, fuga a
          sint totam distinctio autem id sunt perferendis suscipit consectetur,
          accusantium possimus! Aut error deserunt incidunt laborum, inventore
          non adipisci libero autem!
        </p>
        {/* Since the post returned is not long, I added more demo data */}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        <form onSubmit={() => alert("Work in progress!")} className="mb-6">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Submit Comment
          </button>
        </form>
        {/* Display existing comments */}
        {filteredComments && filteredComments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {filteredComments &&
              filteredComments.map((comment: IComment) => (
                <li key={comment.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {comment.email}
                    </span>
                  </div>
                  <h3>{comment.name}</h3>
                  <p className="text-gray-600">{comment.body}</p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Post;
