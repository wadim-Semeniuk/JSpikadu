// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUserName = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');
const buttonNewPost = document.querySelector('.button-new-post'); 
const addPostElem = document.querySelector('.add-post');

const listUsers = [
  {
    id: '01',
    email: 'wadimsem@gmail.com',
    password: '12345',
    displayName: 'wadJS'
  },
  {
    id: '02',
    email: 'katesem@gmail.com',
    password: '123456',
    displayName: 'katesemjs',
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email no valid');
      return;
    }
   const user = this.getUser(email);
   if(user && user.password === password) {
     this.authorizedUser(user)
     if(handler) {
      handler();
    }
   } else {
     alert('not found');
   }
  },
  logOut(handler) {
   this.user = null;
   if(handler) {
    handler();
  }
  },
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('email no valid');
      return;
    }

    if(!email.trim() || !password.trim()) {
     alert('del')
     return;
    }

    if(!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}
      listUsers.push(user);
      this.authorizedUser(user)
      if(handler) {
        handler();
      }
    } else {
      alert('user with this email already taken');
    }
  },
  editUser(userName, userPhoto, handler) {
   if(userName) {
    this.user.displayName = userName;
   }

   if(userPhoto) {
    this.user.photo = userPhoto;
   }

   if(handler) {
    handler();
  }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts ={
  allPost: [
    {
      title: 'Заголовлок поста',
      text: 'Далеко-далеко за словесными горами',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'wadim', photo: 'https://www1.assets-gap.com/Asset_Archive/ONWeb/content/0019/050/333/assets/200813_66F_M_DP_Sale.jpg'},
      date: '11.11.2020, 20:54:00',
      like: 45,
      comments: 12,
    },
    {
      title: 'Заголовлок поста 2',
      text: 'Далеко-далеко за словесными горами',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'kate', photo: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d6299439-74e8-4a56-b901-ef0ffd6ead44/da3cej9-67c02682-e399-4c0d-8dfb-ad4962329b6d.jpg/v1/fill/w_800,h_800,q_75,strp/girl_beauty_by_thefirebomb_da3cej9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD04MDAiLCJwYXRoIjoiXC9mXC9kNjI5OTQzOS03NGU4LTRhNTYtYjkwMS1lZjBmZmQ2ZWFkNDRcL2RhM2NlajktNjdjMDI2ODItZTM5OS00YzBkLThkZmItYWQ0OTYyMzI5YjZkLmpwZyIsIndpZHRoIjoiPD04MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.4f2GF2kvniBJruO-p4KBgOeudZtIbiBYcv5E_Xyqpe0'},
      date: '10.9.2020, 20:54:00',
      like: 45,
      comments: 12,
    }
  ],
  addPost(title, text, tags, handler) {

    this.allPost.unshift({
      title,
      text, 
      tags: tags.split(',').map(item => item.trim()),      
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(), 
      like: 0,
      comments: 0,
    })

    if(handler) {
      handler();
    }

  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
    
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPost.forEach(({ title, text, date, tags, like, comments, author }) => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags.map(tag =>  `<a href="#" class="tag">#${tag}</a>`)}
      </div>
      <!-- /.tags -->
    </div>
    <!-- /.post-body -->
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src="${author.photo} " alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>
    `;
  })

  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

  const init = () => {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
    
      const passwordInputValue = passwordInput.value;
      const emailInputValue = emailInput.value;
    
      setUsers.logIn(emailInputValue, passwordInputValue, toggleAuthDom);
      loginForm.reset();
    });
    
    loginSignup.addEventListener('click', event => {
      toggleAuthDom();
      event.preventDefault();
    
       const passwordInputValue = passwordInput.value;
      const emailInputValue = emailInput.value;
    
      setUsers.signUp(emailInputValue, passwordInputValue, toggleAuthDom);
      loginForm.reset();
      toggleAuthDom();
    
      exitElem.addEventListener('click', event => {
       event.preventDefault();
       setUsers.logOut(toggleAuthDom);
    
      })
    });
    
    editElem.addEventListener('click', event => {
      event.preventDefault();
     editContainer.classList.toggle('visible');
     editUserName.value = setUsers.user.displayName;
    });
    
    editContainer.addEventListener('submit', event => {
      event.preventDefault();
      setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom);
      editContainer.classList.remove('visible');
    });

    menuToggle.addEventListener('click', function (event) {
      // отменяем стандартное поведение ссылки
      event.preventDefault();
      // вешаем класс на меню, когда кликнули по кнопке меню 
      menu.classList.toggle('visible');
    })

    buttonNewPost.addEventListener('click', event => {
      event.preventDefault();
      showAddPost();
    });

    addPostElem.addEventListener('submit', event => {
      event.preventDefault();
      const { title, text, tags } = addPostElem.elements;

      if(title.value.length < 6) {
        alert('too short title');
        return;
      }

      if(text.value.length < 50) {
        alert('too short post');
        return;
      }

      setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

      addPostElem.classList.remove('visible');
      addPostElem.reset();

    });

    showAllPosts();
    toggleAuthDom();
  }


document.addEventListener('DOMContentLoaded', init)




