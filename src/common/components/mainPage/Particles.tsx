import React, {useEffect, useState} from "react";
import {Particle, ParticlesContainer} from "@/common/components/mainPage/style.ts";

export const Particles: React.FC = () => {
    const [particles, setParticles] = useState<Array<{
        id: number;
        size: number;
        color: string;
        left: number;
        top: number;
        duration: number;
        delay: number;
    }>>([]);

    useEffect(() => {
        const particleCount = 40;
        const colors = ['#00b4d8', '#0066cc', '#00e6ff'];

        const newParticles = Array.from({length: particleCount}, (_, i) => ({
            id: i,
            size: Math.random() * 20 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5
        }));

        setParticles(newParticles);
    }, []);
    return (
        <ParticlesContainer>
            {particles.map(particle => (
                <Particle
                    key={particle.id}
                    size={particle.size}
                    color={particle.color}
                    left={particle.left}
                    top={particle.top}
                    duration={particle.duration}
                    delay={particle.delay}
                />
            ))}
        </ParticlesContainer>
    );
};
