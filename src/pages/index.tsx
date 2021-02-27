import { CompletedChalenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { GetServerSideProps } from 'next'

import Head from 'next/head'
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>

      <ExperienceBar/>

      <section>
        <div >
          <Profile />
          <CompletedChalenges />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
    </ChallengesProvider>
  )
}
export const getServerSideProps : GetServerSideProps = async(ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return{
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0), 
      challengesCompleted: Number(challengesCompleted ?? 0 )
    }
  }
}
