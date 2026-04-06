import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg border-t border-outline-variant pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-10 group">
            <img
              src="/images/social_logo.jpg"
              alt="5 Sola"
              className="w-12 h-12 rounded-xs object-cover"
            />
            <span className="font-serif text-3xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
              5SOLA.RO
            </span>
          </Link>
          <p className="text-muted max-w-md leading-relaxed mb-10 text-lg font-medium">
            „În sprijinul Bisericii" prin resurse teologice, învățătură fidelă
            Scripturii și conferințe cu vorbitori experimentați, Asociația 5
            Sola sprijină comunități și credincioși în creșterea lor spirituală.
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
            <a
              href="https://wa.me/40742215569"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="mailto:asociatia5sola@gmail.com"
              className="w-12 h-12 border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
            >
              <Mail size={20} />
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
                href="/resurse"
                className="text-muted hover:text-ink transition-colors duration-300 font-medium"
              >
                Resurse
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
              <Mail size={20} className="text-primary" />
              <a
                href="mailto:asociatia5sola@gmail.com"
                className="hover:text-ink transition-colors duration-300"
              >
                asociatia5sola@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-4 text-muted font-medium">
              <Phone size={20} className="text-primary" />
              <a
                href="tel:+40742215569"
                className="hover:text-ink transition-colors duration-300"
              >
                +40 742 215 569
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="label-caps text-[10px]">
          © {new Date().getFullYear()} Asociația 5 Sola. Toate drepturile
          rezervate.
        </p>
      </div>
    </footer>
  );
}
