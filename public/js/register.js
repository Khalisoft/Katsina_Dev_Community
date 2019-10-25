;
(function () {

  //Retrieves the submit button form's input fields by ids
  let submitBtn = document.getElementById('register')
  let usernameEle = document.getElementById('username')
  let emailEle = document.getElementById('email')

  //Adds event listener to the submit button
  submitBtn.addEventListener('click', function () {

    //Verifies the input fields and returns errors where applicable
    let errors = verifyEmailAndUsername()

    //Retrieves the div elements for displaying possible errors
    let emailDiv = document.getElementById('email-error')
    let usernameDiv = document.getElementById('username-error')

    //Checks if there are any errors
    if (Object.values(errors).length > 0) {

      //Displays errors if there are any due to incorrect filling of the form
      displayErrors(errors, usernameDiv, emailDiv)

      //Moves over here if there are no errors
    } else {

      //Hides the div elements for displaying errors since there are none
      emailDiv.style.display = 'none'
      usernameDiv.style.display = 'none'

      //Retrieves the values entered by the user and creates a user object
      let user = {
        username: usernameEle.value,
        email: emailEle.value
      }

      //Retrives users from localStorage
      let users = JSON.parse(localStorage.getItem('users'));

      //Checks if there are already existing users
      if (users) {

        //Checks if a user with entered username alread exist
        if (userExists(user, users)) {
          alert('A user with such username already exists')
          return
        }

        //Adds a user to the list of users
        users.push(user);

        //Persists users list to the local storage
        localStorage.setItem('users', JSON.stringify(users));

        //Redirects user to homepage
        redirect('/')

        //If there are no already existing users
      } else {
        let users = []
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
        redirect('/')
      }
    }
  })

  /**
   * 
   * @param {the path to redirect user} path 
   * 
   * redirects user to the homepage
   */
  function redirect(path) {
    window.location = path
  }

  /**
   * 
   * @param {the user to check if it already exists} myUser 
   * @param {list of users} users 
   * 
   * checks if user already exists
   */
  function userExists(myUser, users) {
    return users.find(user => user.username === myUser.username)
  }


  /**
   * 
   * @param {the errors object to populate} errors 
   * @param {the div element to display username-related errors} usernameDiv 
   * @param {the div element to display email-related errors} emailDiv 
   * 
   * diplays errors if there are any
   */
  function displayErrors(errors, usernameDiv, emailDiv) {
    if (errors.username) {
      let span = document.createElement('span')
      span.innerText = ''
      span.innerText = errors.username
      span.style.color = 'red'
      usernameDiv.appendChild(span)
      usernameDiv.style.display = 'block'
    } else {
      usernameDiv.style.display = 'none'
    }
    if (errors.email) {
      let span = document.createElement('span')
      span.innerText = errors.email
      span.style.color = 'red'
      emailDiv.appendChild(span)
      emailDiv.style.display = 'block'
    } else {
      emailDiv.style.display = 'none'
    }
  }

  /**
   * @returns {errors object}
   * checks if user wants to submit the form without filling in the input fields
   */
  function verifyEmailAndUsername() {
    let username = usernameEle.value
    let email = emailEle.value
    let errors = {}

    if (username === '' || username === null) {
      errors.username = 'Enter valid username'
    }
    if (email === '' || email === null) {
      errors.email = 'Enter valid email address'
    }
    return errors
  }
})()