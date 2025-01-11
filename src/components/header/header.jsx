import React from 'react'
import { Container, Logo, LogoutButton } from "../index";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {

  const authStatus = useSelector((state)=>state.auth.state)
  const navigate = useNavigate();
 
  const navItems = [
    {
      name:"Home",
      slug:"/",
      active: true
    },
    {
      name:"Login",
      slug:"/login",
      active: !authStatus
    },
    {
      name:"Signup",
      slug:"/signup",
      active: !authStatus
    },
    {
      name:"All Posts",
      slug:"/all-posts",
      active:authStatus
    },
    {
      name:"Add Post",
      slug:"/add-post",
      active:authStatus
    },
    
  ]

  return (
    <div>
       <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
               <Logo width='70px'/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item, index)=> 
              item.active ? (
                <li key={item.name}><button  onClick={() => navigate(item.slug)} className=''>{item.name}</button></li>
              ):null)}

              {authStatus && (
                <li>
                  <LogoutButton/>
                </li>
              )}
          </ul>
        </nav>
       </Container>
    </div>
  )
}

export default Header
