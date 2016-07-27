function UserFeedbackService(){

  var userfeedbackService = {
    txt : 'Loading...',
    alert : 'alert-info',
    updateUserFeedback: updateUserFeedback
  };

  return userfeedbackService;

  /**
  * updateUserFeedback method used for updating the user feedback alert box in the view
  * @param {string} alert - Text that will appear in the alert box
  * @param {string} alertType - alert box css class
  * @returns {object}
  */
  function updateUserFeedback(alert, alertType){
    userfeedbackService.txt = alert;
    userfeedbackService.alert = alertType;
    return userfeedbackService;
  }

}
angular.module('Game').service('UserFeedbackService', UserFeedbackService);
