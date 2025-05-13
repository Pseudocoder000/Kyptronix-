import { useJSONFetcher } from '@/hooks/JSONFetcher';
import { useAuthenticator } from '@/hooks/authenticated';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Card, Col, Button, Row } from 'react-bootstrap';

const Profile = () => {
  const authenticated = useAuthenticator();
  const router = useRouter();
  const { uid } = router.query;
  const [errorMsg, setErrorMsg] = useState('');
  const [headerHTML, setHeaderHTML] = useState('');
  const [postHTML, setPostHTML] = useState('');

  const [btnText, setBtnText] = useState('Login To Follow User');
  const [btnHref, setBtnHref] = useState('/users/login');


 

  useEffect(() => {
    if (!uid) return;
    const url = `/api/user/${uid}`;


    const header_markup = (user, btnText) => {
      return (
        <Card>
          <Card.Body>
            <h1 className='card-title'>
              {`${user.name}'s Profile`}
            </h1>
            <h6 className="card-subtitle mb-2 text-muted">
              {`Following: ${user.following.length}  Followers: ${user.followers.length}`}
              <Button type="button" className="btn-outline float-end" id="follow_btn" onClick={handleClick}>{btnText}</Button>
            </h6>
          </Card.Body>
        </Card>
      )
    } 


    const handleClick = async (e) => {
      e.preventDefault();
      if (btnText === 'Login To Follow User') {
        router.push(btnHref);
      } 

      const formData = new FormData();
      formData.append('username',uid);
      const data = new URLSearchParams(formData);
      let res = await fetch(btnHref,{
        method: 'POST',
        credentials: 'include',
        body: data
      });
    
      if (res.status === 200) {
        if (btnText === 'Follow'){
          setBtnText('Unfollow');
          setBtnHref(`/api/user/unfollow/`);
        }
        else if (btnText === 'Unfollow'){
          setBtnText('Follow');
          setBtnHref(`/api/user/follow/`);
        }
        else {
          router.push(btnHref);
        }
      }
    }
    let fetchingUser = async () => {
      let res = await fetch(url);
      if (res.status === 404) {
        setErrorMsg('This User Could Not Be Found');
        return;
      }
      let data = await res.json();
      setHeaderHTML(header_markup(data, btnText));

      fetchingUserData();
    }
    const dataUrl = `/api/user/${uid}/posts`;
    let fetchingUserData = async () => {
      let res = await fetch(dataUrl);

      let data = await res.json();
      if (res.status === 404 || data.length === 0) {
        setErrorMsg('This User Does Not Have Any Posts');
        return;
      }

      setPostHTML(post_markup(data));
    }
    fetchingUser();
    if (!authenticated) return;
    let followedStatus = async () => {
      let res = await fetch(`/api/isFollowing/${uid}`);

      let data = await res.json();

      if (res.status === 404) {
        setErrorMsg(data.msg);
      }

      else {
        if (data.isFollowing === 'own'){
          setBtnText('Dashboard')
          setBtnHref('/dashboard')
        }
        else if (data.isFollowing) {
          setBtnText('Unfollow');
          setBtnHref(`/api/user/unfollow/`);
        }
        else {
          setBtnText('Follow');
          setBtnHref(`/api/user/follow/`);
        }
      }

    }
    followedStatus();

  }, [uid, authenticated, btnHref, btnText])



  return (
    <>
      <div id="profile_header" className="mb-3 col-md-6 m-auto">
        {headerHTML}

      </div>
      <div id="posts">
        {errorMsg && error_markup(errorMsg)}
        {postHTML}
      </div>
    </>
  )
}

export default Profile

const post_markup = (postJSON) => {
  return (
    <>
      {
        postJSON.map((post, index) => (
          <div className='mb-3' key={index}>
            <Col className="col-md-6 m-auto">
              <Card>
                <h4 className="card-header">
                  <Link href={`/users/profile/${post.name}`}>
                    {post.name}
                  </Link>
                </h4>
                <Card.Body>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {post.date}
                  </h6>
                  <p className="card-text">
                    {post.content}
                  </p>
                </Card.Body>

              </Card>
            </Col>
          </div>
        ))
      }
    </>
  )
}



const error_markup = (error_message) => {
  return (
    <Row className="mt-5">
      <Col className="col-md-6 m-auto">
        <Card className="card-body">
          <h1 className="text-center mb-3">{error_message}</h1>
        </Card>
      </Col>
    </Row>
  )
}


