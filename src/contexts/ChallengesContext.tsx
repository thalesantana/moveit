import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextsData{
    level: number;
    currentExperience: number; 
    experienceToNextLevel: number; 
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallegensProviderProps{
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextsData);

export function ChallengesProvider({children}: ChallegensProviderProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] =useState(null)

    const experienceToNextLevel = Math.pow((level + 1)* 4,2)

    // COUNTDOWN CONTEXT //
    

    // CHALLENGE CONTEXT //
    function levelUp(){
        setLevel(level + 1);
    }
    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge);
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completedChallenge(){
        if(!activeChallenge){
            return;
        }
        const{ amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if( finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted +1);
    }
    return(
        <ChallengesContext.Provider 
        value={{ 
                level, 
                levelUp, 
                currentExperience,
                experienceToNextLevel, 
                challengesCompleted,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completedChallenge 
                }}
            >
            {children}
        </ChallengesContext.Provider>
    ); 
}