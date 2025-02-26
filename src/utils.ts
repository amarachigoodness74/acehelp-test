import { useQuery } from "@tanstack/react-query";

export const sections = [
  {
    name: "Blog",
    path: "/blog",
    color: "bg-blue-500",
    hover: "hover:bg-blue-600",
  },
  {
    name: "Users",
    path: "/users",
    color: "bg-green-500",
    hover: "hover:bg-green-600",
  },
  {
    name: "Todos",
    path: "/todos",
    color: "bg-yellow-500",
    hover: "hover:bg-yellow-600",
  },
  {
    name: "Albums",
    path: "/albums",
    color: "bg-purple-500",
    hover: "hover:bg-purple-600",
  },
];

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["postsData"],
    queryFn: () => fetchData("https://jsonplaceholder.typicode.com/posts"),
    staleTime: Infinity, // Never refetch automatically
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["usersData"],
    queryFn: () => fetchData("https://jsonplaceholder.typicode.com/users"),
    staleTime: Infinity, // Never refetch automatically
  });
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todosData"],
    queryFn: () => fetchData("https://jsonplaceholder.typicode.com/todos"),
    staleTime: Infinity, // Never refetch automatically
  });
};

export const useAlbums = () => {
  return useQuery({
    queryKey: ["albumsData"],
    queryFn: () => fetchData("https://jsonplaceholder.typicode.com/albums"),
    staleTime: Infinity, // Never refetch automatically
  });
};

export const fetchCountryFlag = async (lng: string, lat: string) => {
  try {
    const res = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    const data = await res.json();
    return data.countryCode;
  } catch (error) {
    console.error("Error fetching geo data", error);
  }
};
