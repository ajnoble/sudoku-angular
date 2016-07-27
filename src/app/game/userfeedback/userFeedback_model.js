function UserFeedbackService(){

  var userfeedback = {
    txt : '',
    alert : '',
    updateUserFeedback: updateUserFeedback
  };

  return userfeedback;

  /**
  * updateUserFeedback method used for updating the user feedback alert box in the view
  * @param {string} alert - Text that will appear in the alert box
  * @param {string} alertType - alert box css class
  * @returns {object}
  */
  function updateUserFeedback(alert, alertType){
    userfeedback.txt = alert;
    userfeedback.alert = alertType;
    return userfeedback;
  }

}
angular.module('Game').service('UserFeedbackService', UserFeedbackService);
