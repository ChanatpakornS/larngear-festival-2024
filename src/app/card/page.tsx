'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '@public/logo.svg';
import BG from '@public/card/bg.svg';
import Sticker from '@/components/card/Sticker';
import Name from '@/components/card/Name';
import Share from '@/components/card/Share';
import Stamp1 from '@public/card/stamp1.svg';
import Stamp2 from '@public/card/stamp2.svg';
import Stamp3 from '@public/card/stamp3.svg';
import Stamp4 from '@public/card/stamp4.svg';
import Stamp5 from '@public/card/stamp5.svg';
import Stamp6 from '@public/card/stamp6.svg';

const Stamps = [Stamp1, Stamp2, Stamp3, Stamp4, Stamp5, Stamp6];

type CardMode = 'sticker' | 'name' | 'share';

export default function Card() {
    const [phase, setPhase] = useState<CardMode>('sticker');
    const [selected, setSelected] = useState<number | null>(null);
    const [name, setName] = useState<string>('');
    const [stamps, setStamps] = useState<string[]>(['', '', '', '', '', '']);

    const phases: CardMode[] = ['sticker', 'name', 'share'];
    const rotations = [-15, 0, 15, -15, 0, 15];

    const handleNextPhase = () => {
        setPhase((prevPhase) => {
            const currentIndex = phases.indexOf(prevPhase);
            const nextIndex = (currentIndex + 1) % phases.length;
            return phases[nextIndex];
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    };

    const handleSelectedStamp = (index: number, sticker: string) => {
        const newStamp = [...stamps];
        newStamp[index] = sticker;
        setStamps(newStamp);
    };

    return (
        <main className="flex flex-col items-center justify-center gap-12 bg-purple-800 p-10">
            <Image src={Logo} alt="logo" width={100} height={100} />
            <section className="relative h-[195.39px] w-full max-w-[300px]">
                <Image
                    src={BG}
                    alt="background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute left-0 top-0"
                />

                <div className="z-1 relative grid h-full w-full grid-cols-3 grid-rows-2">
                    {stamps.map((Stamp, index) => (
                        <div
                            key={index}
                            className={`grid place-items-center ${selected === index ? 'animate-pulse border-2 border-purple-500' : ''}`}
                            onClick={() => setSelected(index)}
                        >
                            {Stamp !== '' && (
                                <Image
                                    src={Stamp}
                                    className="h-4/5 w-4/5 object-contain transition-transform duration-300"
                                    alt={`Stamp ${index + 1}`}
                                    style={{
                                        transform: `rotate(${rotations[index]}deg)`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>
            {phase === 'sticker' && (
                <Sticker
                    stickers={Stamps}
                    selected={selected}
                    handleSelected={setSelected}
                    handleStamps={handleSelectedStamp}
                />
            )}
            {phase === 'name' && (
                <Name
                    name={name}
                    handleKeyPressed={handleKeyPress}
                    handleNameChanged={setName}
                />
            )}
            {phase === 'share' && <Share name={name} />}
            <button
                onClick={handleNextPhase}
                className={`h-12 w-64 rounded-2xl border-2 border-black ${phase !== 'share' ? 'bg-blue-600' : 'bg-pink-400'} text-3xl text-white`}
            >
                {phase !== 'share' ? 'ไปกันต่อ!' : 'แชร์ผลลัพธ์'}
            </button>
        </main>
    );
}
