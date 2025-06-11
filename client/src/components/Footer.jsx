import React from 'react';
import { 
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  FooterDivider
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-pink-600">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
                Manisha's
              </span>
              Blog
            </Link>
             <p className="text-gray-500 dark:text-gray-400">
              Sharing knowledge about web development and programming.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </FooterLink>
                <FooterLink
                  href="/about"
                >
                  About Me
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/manisha-024"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </FooterLink>
                <FooterLink href="#">
                  LinkedIn
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="/privacy">
                  Privacy Policy
                </FooterLink>
                <FooterLink href="/terms">
                  Terms & Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="flex flex-col items-center justify-between md:flex-row">
          <FooterCopyright
            href="#"
            by="Manisha's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook}/>
            <FooterIcon href="#" icon={BsInstagram}/>
            <FooterIcon href="#" icon={BsTwitter}/>
            <FooterIcon href="https://github.com/manisha-024" icon={BsGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}