$(document).ready(function () {

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "30000",
    "hideDuration": "10000",
    "timeOut": "50000",
    "extendedTimeOut": "10000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  $('select').material_select();

  $.validator.setDefaults({
    ignore: []
  });

  $("form").validate({
    submitHandler: function (form) {
      console.log(form);

      return;
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  // Input fields
  $("#submitForm").on('submit', (e) => {

    const QUESTIONS = {
      noob: 'I am new to programming and have never worked with programming languages before',
      basic: 'I have a basic grasp on programming concepts and can implement simple programs in a language like C, Java or python',
      amateur: 'I have taken a course in DSA thus have an understanding of it',
      professional: 'I have extensively worked with C, java or other languages and can easily convert thought to code using proper data structures and efficient algorithms',
      beginner: 'I am a beginner with no prior experience in python',
      syntax: 'I know the syntax but haven\'t made anything cool with it yet',
      intermediate: 'I have various side projects in Python and I can write efficient python code following best practices',
      docs: 'I am not afraid to pull up docs to find what I am looking for'
    };

    let Name = $.trim($("#name").val());
    let Email = $.trim($("#email").val());
    let mobile = $.trim($("#mob").val());
    let college = $.trim($("#college").val());
    let branch = $.trim($("#branch").val());
    let year = $.trim($("#year").val());

    let experience = $("input[name='experience']:checked").val();
    let category = $("input[name='category']:checked").val();

    const data = {
      Name, Email, mobile, college, branch, year,
      experience: QUESTIONS[experience],
      category: QUESTIONS[category]
    };

    toastr['error']("Sorry. We have closed the registration now.");
    return;

    console.log(data);

    // Submit this "data" object to server
    try {
      fetch(
        "http://35.225.175.55:8000/register",
        {
          method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow", referrer: "no-referrer", body: JSON.stringify(data)
        }
      ).then(resp => resp.text()).then(
        (res) => {
          console.log(res);
          if (res === 'Registered Succesfully') {
            toastr['success']("Registration Completed!");
          }
          else if (res === 'Already Registered') {
            toastr['error']("Already Registed!");
          }
          else {
            toastr['error']("Registration failed!");
          }
        });

    } catch (err) {
      console.log(err);
    }
  });
});
