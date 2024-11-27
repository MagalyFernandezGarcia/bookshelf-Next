import { getFullBook } from "@/app/db.service";

import FormUpdate from "@/components/FormUpdate";

import NavigateBtn from "@/components/Buttons/NavigateBtn";

interface BookPageProps {
  params: { id: string };
}

const updatePage = async ({ params }: BookPageProps) => {
  const { id } = params;

  const currentBook = await getFullBook(parseInt(id));

  //vérifie que currentBook n'est pas undefined
  if (currentBook) {
    return (
      <>
        <NavigateBtn
          location="left"
          txt="retour"
          href={`/bookshelf/${currentBook.id}`}
        />

        <FormUpdate currentBook={currentBook} />
      </>
    );
  }

  return <p className="text-4xl mt-44">Book not found</p>;
};

export default updatePage;
