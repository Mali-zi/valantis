export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center pb-8 md:pb-16 bg-purple-950 text-purple-200">
      <hr className="border border-purple-600 mb-8 md:mb-16" />
      &#169; {year} Coded By Natali Zikrach
    </footer>
  );
}
