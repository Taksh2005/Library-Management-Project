import Itemcard from "./components/Itemcard";

export default function Home() {
  const data = [
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Great Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Great Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Great Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
    {
      imageUrl:
        "https://www.shutterstock.com/image-photo/blue-book-isolated-on-white-600nw-2179864007.jpg",
      title: "The Book",
      rating: 4.8,
      type: "Book",
      link: "/details/the-great-book",
    },
  ];
  return (
    <div className="px-8 flex flex-wrap gap-2">
      {data.map((item) => {
        return <Itemcard itemProps={item} />;
      })}
    </div>
  );
}
