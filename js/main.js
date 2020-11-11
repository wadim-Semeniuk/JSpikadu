// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

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
     handler();
   } else {
     alert('not found');
   }
  },
  logOut(handler) {
   this.user = null;
   handler();
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
      handler();
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

   handler();
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
      author: 'wadimsem@gmail.com',
      date: '11.11.2020, 20:54:00',
      like: 45,
      comments: 12,
    },
    {
      title: 'Заголовлок поста 2',
      text: 'Далеко-далеко за словесными горами',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'katesem@gmail.com',
      date: '10.9.2020, 20:54:00',
      like: 45,
      comments: 12,
    }

  ],

};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName
    userAvatarElem.src = user.photo || userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
}



const showAllPosts = () => {

  let postsHTML = '';

  setPosts.allPost.forEach(({ title, text, date, tags }) => {
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags}
        <a href="#" class="tag">#свежее</a>
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
          <span class="likes-counter">26</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">157</span>
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
          <a href="#" class="author-username">arteislamov</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section>
    `;
  })

  postsWrapper.innerHTML = postsHTML;



}
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
    showAllPosts();
    toggleAuthDom();
  }


document.addEventListener('DOMContentLoaded', init)




