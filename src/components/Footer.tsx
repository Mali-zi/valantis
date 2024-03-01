export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center py-8 md:py-16 bg-pink-950 text-slate-100">
      &#169; {year} Coded By Natali Zikrach
    </footer>
  );
}
