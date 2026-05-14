import NavBar from "@/components/prod/navbar";
import CustomizedForm from "@/forms/customize_film";

export default function CustomizeFilm() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50">
      <NavBar />
      <main className="flex gap-6 flex-1 w-full flex-col items-center justify-between py-16 px-16 bg-white">
        <CustomizedForm />
      </main>
    </div>
  );
}
