import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { status } = useSession();

    const getNavBarOptions = () => {
        if (status !== "authenticated") {
            return <div />
        } else {
            return (
                <Link href="/protective-claims" id="protective-claims-nav-link" onClick={() => setUnderline('protective-claims-nav-link')} passHref className='nav-link w-auto mr-24 text-xl'>
                        Protective Claims Generator
                </Link>
            )
        }
    }

    const setUnderline = (navTabId: string) => {
        const navUnderlineClass = 'nav-link-underline';
        const navLinks = document.getElementsByClassName('nav-link');
        for (let i = 0; i < navLinks.length; i++) {
            if (navLinks[i].classList.contains(navUnderlineClass) && navLinks[i].id !== navTabId) {
                navLinks[i].classList.remove(navUnderlineClass);
            } else if (!navLinks[i].classList.contains(navUnderlineClass) && navLinks[i].id === navTabId && navTabId !== 'home-nav-link') {
                navLinks[i].classList.add(navUnderlineClass);
            }
        }
    }

    return (
        <div>
            <nav className='flex flex-row items-center justify-between w-full'>
                <Link href="/" id="home-nav-link" className='nav-link flex-none cursor-pointer' onClick={() => setUnderline('home-nav-link')}>
                    <Image width={300} height={90} src="/veraleo_logo.png" alt="VerAleo Logo"/>
                </Link>
                <div className='flex flex-none flex-row items-center mr-20 justify-center'>
                    {getNavBarOptions()}
                </div>
            </nav>
            <div className='w-11/12 mx-auto my-0 h-0.5 bg-blue-300'></div>
        </div>
    )
}