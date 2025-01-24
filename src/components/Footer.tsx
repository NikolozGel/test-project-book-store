export default function Footer() {
  return (
    <footer className=" bg-[#f8f8f8] text-white mt-10">
      <div className="p-24">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold  text-blue-400">BookShop</h3>
            <p className="text-sm mt-2 text-[#A1A1A1]">
              Your one-stop shop for amazing books.
            </p>
          </div>
          <div className="space-x-6">
            <a href="#" className="text-sm text-[#A1A1A1]">
              About Us
            </a>
            <a href="#" className="text-sm hover:text-blue-400 text-[#A1A1A1]">
              Contact
            </a>
            <a href="#" className="text-sm hover:text-blue-400 text-[#A1A1A1]">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-blue-400 text-[#A1A1A1]">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-sm text-[#A1A1A1]">
            &copy; {new Date().getFullYear()} BookShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
