import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/mauricennadijamachi',
  },
  {
    title: 'Twitter',
    href: 'https://x.com/fushiondevhub',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/fushionhubdev',
  },
  {
    title: 'Website',
    href: 'https://facebook.com/mauricennadijamachi',
  },
]
export const Footer = () => {
  return (
      <footer className="relative -z-10 overflow-x-clip">

        <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>

        <div className="container">

          <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">

            <div className="text-white/40">
              &copy; 2025. All right reserved.
            </div>

            <nav className="flex flex-col md:flex-row items-center gap-8">
              {footerLinks.map((link) => (
                <a href={link.href} key={link.title} className="inline-flex items-center gap-1.5">
                  <button className="font-semibold">{link.title}</button>
                  <ArrowUpRightIcon className="size-4" />
                </a>
              ))}
            </nav>

          </div>

        </div>

      </footer>
  );
};
