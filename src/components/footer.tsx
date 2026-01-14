export default function Footer() {
  return (
    <footer className="bg-[#353535] text-white py-4">
      <div className="container mx-auto text-center text-sm">
        <span className="text-[#5B9BD5] font-semibold">Flight On Time</span>
        <span className="pl-2">&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="container mx-auto text-center text-sm mt-1">
        <span>Desenvolvido por AlcateIA</span>
      </div>
    </footer>
  );
}
