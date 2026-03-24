import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-outline-variant pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <div className="w-12 h-12 bg-primary flex items-center justify-center font-serif text-white text-2xl group-hover:bg-primary-dark transition-colors duration-300 rounded-xs">
              5
            </div>
            <span className="font-serif text-3xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
              SOLA.RO
            </span>
          </Link>
          <p className="text-muted max-w-md leading-relaxed mb-10 text-lg font-medium">
            Asociația Sola Scriptura promovează valorile Reformei Protestante în contextul românesc,
            punând accent pe autoritatea Scripturii și centralitatea lui Hristos.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.facebook.com/p/5-Sola-100089754032341"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/conferinta5sola"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@Asociatia5sola"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="label-caps text-primary mb-10">Link-uri utile</h4>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                href="/cine-suntem"
                className="text-muted hover:text-ink transition-colors duration-300 font-medium"
              >
                Cine suntem
              </Link>
            </li>
            <li>
              <Link
                href="/ce-credem"
                className="text-muted hover:text-ink transition-colors duration-300 font-medium"
              >
                Ce credem
              </Link>
            </li>
            <li>
              <Link
                href="/evenimente"
                className="text-muted hover:text-ink transition-colors duration-300 font-medium"
              >
                Evenimente
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted hover:text-ink transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="label-caps text-primary mb-10">Contact</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-center gap-4 text-muted font-medium">
              <MapPin size={20} className="text-primary" />
              <span>București, România</span>
            </li>
            <li className="flex items-center gap-4 text-muted font-medium">
              <Mail size={20} className="text-primary" />
              <a href="mailto:asociatia5sola@gmail.com" className="hover:text-ink transition-colors duration-300">
                asociatia5sola@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-4 text-muted font-medium">
              <Phone size={20} className="text-primary" />
              <a href="tel:+40742215569" className="hover:text-ink transition-colors duration-300">
                +40 742 215 569
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="label-caps text-[10px]">
          © {new Date().getFullYear()} Asociația Sola Scriptura. Toate drepturile rezervate.
        </p>
        <div className="flex gap-10 label-caps text-[10px]">
          <a href="#" className="hover:text-primary transition-colors duration-300">
            Termeni și condiții
          </a>
          <a href="#" className="hover:text-primary transition-colors duration-300">
            Politica de confidențialitate
          </a>
        </div>
      </div>
    </footer>
  );
}
