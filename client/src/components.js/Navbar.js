function Navbar(props) {
    return (
        <div>
            <nav class="bg-blue-950 px-6 py-4 text-white font-montserrat">
                <div class="flex items-center justify-between">
                    <a href="/" class="text-2xl font-bold">Film Junkies</a>
                    <div class="hidden md:flex">
                        <a href="/about" class="mx-4 hover:text-blue-300">About</a>
                        <a href="/services" class="mx-4 hover:text-blue-300">Services</a>
                        <a href="/contact" class="mx-4 hover:text-blue-300">Contact</a>
                    </div>
                    <button class="md:hidden focus:outline-none">
                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
}
export default Navbar;
