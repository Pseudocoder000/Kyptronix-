import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import { useAuthenticator } from '@/hooks/authenticated'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const authenticated = useAuthenticator();
  let router = useRouter();
  useEffect(() => {
    if(authenticated === true){
      router.push('/dashboard');
    }
  },[authenticated,router]);
  return (
    <>
      <Head>
        <title>Social Media Clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main >
        <Container>
          <Row className='mt-5'>
            <Col className='col-md-6 m-auto'>
              <Card className='card-body text-center'>
                <h1 className='display-3'>Social Media Clone</h1>
                <p>Create an account or login</p>
                <Link href='/users/register' className='btn btn-primary btn-block mb-2'>               
                    Register              
                </Link>
                <Link href='/users/login' className='btn btn-secondary btn-block'>
                  Login
                </Link>
              </Card>
            </Col>

          </Row>
        </Container>

      </main>
    </>
  )
}
