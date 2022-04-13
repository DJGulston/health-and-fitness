// Array meant for containing a list of the inner HTML of the user's saved items.
let saved_items = [];

// Arrays each meant for containing a list of the inner HTML of user added comments for their respective webpages.
let weights_comments = [];
let cardio_comments = [];
let nutrition_comments = [];

// Arrays each meant for containing a list of boolean values that indicates whether a specific item is liked or not liked within their respective webpages.
let weights_likes = [];
let cardio_likes = [];
let nutrition_likes = [];

$(document).ready(function(){

    // Check if the website has NOT been visited before.
    if(localStorage.getItem("visitedBefore") === null){

        // Variables initialized in local storage for future data manipulation.
        localStorage.setItem("visitedBefore", true);
        localStorage.setItem("savedItems", JSON.stringify(saved_items));
        localStorage.setItem("weightsComments", JSON.stringify(weights_comments));
        localStorage.setItem("cardioComments", JSON.stringify(cardio_comments));
        localStorage.setItem("nutritionComments", JSON.stringify(nutrition_comments));
        
        // All likes on the index webpage set to initial value of false. Hence, all items are not yet liked by the user.
        for(i = 0; i < 14; i++){
            weights_likes.push(false);
        }

        // All likes on the cardio webpage set to initial value of false. Hence, all items are not yet liked by the user.
        for(i = 0; i < 2; i++){
            cardio_likes.push(false);
        }

        // All likes on the nutrition webpage set to initial value of false. Hence, all items are not yet liked by the user.
        for(i = 0; i < 3; i++){
            nutrition_likes.push(false);
        }

        // All likes arrays saved to local storage
        localStorage.setItem("weightsLikes", JSON.stringify(weights_likes));
        localStorage.setItem("cardioLikes", JSON.stringify(cardio_likes));
        localStorage.setItem("nutritionLikes", JSON.stringify(nutrition_likes));

        // All like indicators are hidden from all webpages, as none of them have been liked by the user yet.
        $(".likedImg").hide();

    }
    // Checks if webpage has been visited before.
    else if(JSON.parse(localStorage.getItem("visitedBefore")) === true){
        
        // All previously "saved for later" items are retrieved from local storage and added to the saved items array.
        saved_items = JSON.parse(localStorage.getItem("savedItems"));
        
        // All previously user added comments retrieved from local storage and added to their respective arrays.
        weights_comments = JSON.parse(localStorage.getItem("weightsComments"));
        cardio_comments = JSON.parse(localStorage.getItem("cardioComments"));
        nutrition_comments = JSON.parse(localStorage.getItem("nutritionComments"));

        // All previously liked items are retrieved from local storage and addedd to their respective arrays.
        weights_likes = JSON.parse(localStorage.getItem("weightsLikes"));
        cardio_likes = JSON.parse(localStorage.getItem("cardioLikes"));
        nutrition_likes = JSON.parse(localStorage.getItem("nutritionLikes"));

    }

    // Dropdown clicked status set to a default value of false.
    let dropdownClicked = false;
    
    // All dropdown menu items are slid up by default whenever the page is loaded.
    $("#dropdownItems").slideUp("fast");

    // If the dropdown menu button is clicked, the dropdown menu slides up or down depending on the dropdown clicked status.
    $("#dropdown").click(function(){
        // If dropdown clicked status is false, set the status to true and slide down the dropdown menu.
        if(dropdownClicked == false){
            dropdownClicked = true;
            $("#dropdownItems").slideDown("slow", function(){
                $("#dropdown").html("Hide Websites -");
            });
        }
        // If the dropdown clicked status is true, set the status to false and slide the dropdown menu up.
        else if(dropdownClicked){
            dropdownClicked = false;
            $("#dropdownItems").slideUp("slow", function(){
                $("#dropdown").html("Show Websites +");
            });
        }
    });

    // Checks if the current page is on the Saved For Later page (aka the Saved Items page).
    if(window.location.href.search("save_for_later.html") != -1){
        
        // Each user saved item is retrieved from the saved items array and appended to the savedItems div.
        saved_items.forEach(function(item){
            let savedForLater = document.getElementById("savedItems");

            let newDiv = document.createElement("div");
            
            newDiv.innerHTML += item;

            savedForLater.appendChild(newDiv);

        });
    }
    // Checks if the current page is on the Index page (aka the Weights page).
    else if(window.location.href.search("index.html") != -1){
        
        // Each user added comment that was added to the index page is retrieved from the weights comments array and appended to the comment section.
        weights_comments.forEach(function(comment){
            $("#commentSection").append(comment);
        });
        
        // Whenever the add comment button is clicked on the index page, the user's name and comment is added to the weights comments array, and the new weights array is saved to local storage.
        $("#submitComment").click(function(){

            // User's name and comment obtained from comment section form.
            let userName = document.getElementById("userName").value;
            let userComment = document.getElementById("userComment").value;
    
            // Checks that the user's name and comment is not a blank string.
            if(userName != "" && userComment != ""){
                let newComment = document.createElement("div");

                newComment.innerHTML += `<q>${userComment}</q><br>&mdash; <i>${userName}</i><br><br>`;

                weights_comments.push(newComment.innerHTML); // New user comment is pushed to the weights array.

                localStorage.setItem("weightsComments", JSON.stringify(weights_comments)); // Updated weights comments array saved to local storage.
            }
        });
        
        for(i = 1; i <= 14; i++){
            // Checks if the like status of an item on the index page is true. If true, the like indicator image is shown.
            if(weights_likes[i-1] == true){
                $("#weightsLike" + i).show(); // Like indicator image shown.

                $("#btnLikeWeights" + i).html("Unlike"); // "Like" button text changes to "Unlike".

            }
            // Checks if the like status of an item on the index page is false. If false, the like indicator image is no longer shown.
            else if(weights_likes[i-1] == false){
                $("#weightsLike" + i).hide(); // Like indicator not shown.

                $("#btnLikeWeights" + i).html("Like"); // "Unike" button text changes to "Like".

            }

            // Specific item on page is obtained.
            let itemContent = document.getElementById("weights_" + i).innerHTML + "<br><hr><br>";

            // Checks if this specific item is a saved item in the saved items array.
            if(saved_items.includes(itemContent)){
                $("#saveWeights" + i).html("Unsave Item"); // "Save For Later" button text set to "Unsave Item".
            }
            // Checks if this specific item is NOT a saved item in the saved items array.
            else if(!saved_items.includes(itemContent)){
                $("#saveWeights" + i).html("Save For Later"); // "Unsave Item" button text set to "Save For Later."
            }

        }

        // Checks for any button click event on the index page.
        $("button").click(function(event){
            
            for(i = 1; i <= 14; i++){

                // Checks if the "Save For Later" / "Unsave Item" button for a specific item is clicked.
                // If the specific item already exists in the saved items array, it is removed from the saved items array, and thus removed from the saved items folder.
                // If it does not already exist in the saved items array, it is added to saved items array, and thus added to the saved items folder.
                if(event.target.id == "saveWeights" + i){

                    // Specific item obtained from array.
                    let itemContent = document.getElementById("weights_" + i).innerHTML + "<br><hr><br>";

                    // Checks if specific item has been saved to the saved items array.
                    if(saved_items.includes(itemContent)){
                        
                        $("#" + event.target.id).html("Saved For Later"); // "Unsave Item" button text changed to "Save For Later".

                        let removedIndex = saved_items.indexOf(itemContent);

                        saved_items.splice(removedIndex, 1); // Saved item removed from array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
                    }
                    else{
                        $("#" + event.target.id).html("Unsave Item"); // "Save For Later" button text changed to "Unsave Item".

                        saved_items.push(itemContent); // Item added to array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
                    }

                    alert("You have saved " + saved_items.length + " items to your Saved Items folder."); // User told how many items they have in their saved items folder.


                }

                // Checks if "Like" / "Unlike" button is clicked.
                // If the "Like" button is clicked, the Like indicator image is shown.
                // If the "Unlike" button is clicked, the Like indicator image is no longer shown.
                if(event.target.id == "btnLikeWeights" + i){
                    
                    // Checks if current item at index i-1 is NOT already liked.
                    if(weights_likes[i-1] == false){
                        
                        weights_likes[i-1] = true; // Like status in weights likes array changed to true.
                        
                        $("#weightsLike" + i).show().animate({marginLeft: "+=50px"}).animate({marginLeft: "-=50px"}); // Like indicator image is shown and animated.

                        $("#btnLikeWeights" + i).html("Unlike"); // "Like" button text changed to "Unlike".

                        localStorage.setItem("weightsLikes", JSON.stringify(weights_likes)); // Updated weights likes array saved to storage.
                    }
                    // Checks if current item at index i-1 is already liked.
                    else if(weights_likes[i-1] == true){
                        
                        weights_likes[i-1] = false; // Like status is weights likes array changed to true.
                        
                        $("#weightsLike" + i).hide(); // Like indicator image no longer shown.

                        $("#btnLikeWeights" + i).html("Like"); // "Unlike" button text changed to "Like".

                        localStorage.setItem("weightsLikes", JSON.stringify(weights_likes)); // Updated weights likes array saved to local storage.
                    }
                }

            }
        });

        

    }
    // Checks if current page is on the Cardio page.
    else if(window.location.href.search("cardio.html") != -1){
        
        // Each user added comment that was added to the cardio page is retrieved from the cardio comments array and appended to the comment section.
        cardio_comments.forEach(function(comment){
            $("#commentSection").append(comment);
        });
        

        // Whenever the add comment button is clicked on the cardio page, the user's name and comment is added to the cardio comments array, and the new cardio array is saved to local storage.
        $("#submitComment").click(function(){

            // User's name and comment obtained from comment section form.
            let userName = document.getElementById("userName").value;
            let userComment = document.getElementById("userComment").value;
    
            // Checks that the user's name and comment is not a blank string.
            if(userName != "" && userComment != ""){
                
                let newComment = document.createElement("div");

                newComment.innerHTML += `<q>${userComment}</q><br>&mdash; <i>${userName}</i><br><br>`;

                cardio_comments.push(newComment.innerHTML); // New user comment is pushed to the cardio array.

                localStorage.setItem("cardioComments", JSON.stringify(cardio_comments)); // Updated cardio array saved to local storage.
            }
        });

        for(i = 1; i <= 2; i++){

            // Checks if the like status of an item on the cardio page is true. If true, the like indicator image is shown.
            if(cardio_likes[i-1] == true){
                
                $("#cardioLike" + i).show(); // Like indicator image shown.

                $("#btnLikeCardio" + i).html("Unlike"); // "Like" button text changes to "Unlike".

            }
            // Checks if the like status of an item on the index page is false. If false, the like indicator image is no longer shown.
            else if(cardio_likes[i-1] == false){
                
                $("#cardioLike" + i).hide(); // Like indicator image no longer shown.

                $("#btnLikeCardio" + i).html("Like"); // "Unlike" button text changes to "Like".

            }

            // Specific item on page is obtained.
            let itemContent = document.getElementById("cardio_" + i).innerHTML + "<br><hr><br>";

            // Checks if this specific item is a saved item in the saved items array.
            if(saved_items.includes(itemContent)){
                $("#saveCardio" + i).html("Unsave Item"); // "Unsave Item" button text changed to "Save For Later".
            }
            // Checks if this specific item is NOT a saved item in the saved items array.
            else if(!saved_items.includes(itemContent)){
                $("#saveCardio" + i).html("Save For Later"); // "Save For Later" button text changed to "Unsave Item".
            }
        }
        
        // Checks for any button click event on the cardio page.
        $("button").click(function(event){

            for(i = 1; i <= 2; i++){

                // Checks if the "Save For Later" / "Unsave Item" button for a specific item is clicked.
                // If the specific item already exists in the saved items array, it is removed from the saved items array, and thus removed from the saved items folder.
                // If it does not already exist in the saved items array, it is added to saved items array, and thus added to the saved items folder.
                if(event.target.id == "saveCardio" + i){

                    // Specific item obtained from array.
                    let itemContent = document.getElementById("cardio_" + i).innerHTML + "<br><hr><br>";

                    // Checks if specific item has been saved to the saved items array.
                    if(saved_items.includes(itemContent)){

                        $("#" + event.target.id).html("Saved For Later"); // "Unsave Item" button text changed to "Save For Later".

                        let removedIndex = saved_items.indexOf(itemContent);

                        saved_items.splice(removedIndex, 1); // Item removed from saved items array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated saved items array saved to local storage.
                    }
                    else{
                        $("#" + event.target.id).html("Unsave Item"); // "Save For Later" button text changed to "Unsave Item".

                        saved_items.push(itemContent); // Item added to array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
                    }

                    // User alerted how many items they currently have in their saved items folder.
                    alert("You have saved " + saved_items.length + " items to your Saved Items folder.");
                }

                // Checks if "Like" / "Unlike" button is clicked.
                // If the "Like" button is clicked, the Like indicator image is shown.
                // If the "Unlike" button is clicked, the Like indicator image is no longer shown.
                if(event.target.id == "btnLikeCardio" + i){
                    
                    // Checks if current item at index i-1 is NOT already liked.
                    if(cardio_likes[i-1] == false){
                        
                        cardio_likes[i-1] = true; // Like status is cardio likes array changed to true.
                        
                        $("#cardioLike" + i).show().animate({marginLeft: "+=50px"}).animate({marginLeft: "-=50px"}); // Like indicator image is shown and animated.

                        $("#btnLikeCardio" + i).html("Unlike"); // "Like" button text changed to "Unlike".

                        localStorage.setItem("cardioLikes", JSON.stringify(cardio_likes)); // Updated cardio likes array saved to storage.
                    }
                    // Checks if current item at index i-1 is already liked.
                    else if(cardio_likes[i-1] == true){

                        cardio_likes[i-1] = false; // Like status is cardio likes array changed to false.
                        
                        $("#cardioLike" + i).hide(); // Like indicator is no longer shown.

                        $("#btnLikeCardio" + i).html("Like"); // "Unlike" button text changed to "Like".

                        localStorage.setItem("cardioLikes", JSON.stringify(cardio_likes)); // Updated cardio likes array saved to storage.
                    }
                }

            }
        });
    }
    // Checks if current page is on the Nutrition page.
    else if(window.location.href.search("nutrition.html") != -1){
        
        // Each user added comment that was added to the nutrition page is retrieved from the nutrition comments array and appended to the comment section.
        nutrition_comments.forEach(function(comment){
            $("#commentSection").append(comment);
        });
        
        // Whenever the add comment button is clicked on the nutrition page, the user's name and comment is added to the nutrition comments array, and the new nutrition array is saved to local storage.
        $("#submitComment").click(function(){

            // User's name and comment obtained from comment section form.
            let userName = document.getElementById("userName").value;
            let userComment = document.getElementById("userComment").value;
    
            // Checks that the user's name and comment is not a blank string.
            if(userName != "" && userComment != ""){
                let newComment = document.createElement("div");

                newComment.innerHTML += `<q>${userComment}</q><br>&mdash; <i>${userName}</i><br><br>`;

                nutrition_comments.push(newComment.innerHTML); // New user comment is pushed to the nutrition array.

                localStorage.setItem("nutritionComments", JSON.stringify(nutrition_comments)); // Updated nutrition array saved to local storage.
            }
        });

        for(i = 1; i <= 3; i++){

            // Checks if the like status of an item on the nutrition page is true. If true, the like indicator image is shown.
            if(nutrition_likes[i-1] == true){

                $("#nutritionLike" + i).show(); // Like indicator image shown.

                $("#btnLikeNutrition" + i).html("Unlike"); // "Like" button text changes to "Unlike".

            }
            else if(nutrition_likes[i-1] == false){

                $("#nutritionLike" + i).hide(); // Like indicator image is no longer shown.

                $("#btnLikeNutrition" + i).html("Like"); // "Unlike" button text changes to "Like".

            }

            // Specific item on page is obtained.
            let itemContent = document.getElementById("nutrition_" + i).innerHTML + "<br><hr><br>";

            // Checks if this specific item is a saved item in the saved items array.
            if(saved_items.includes(itemContent)){
                $("#saveNutrition" + i).html("Unsave Item"); // "Unsave Item" button text changed to "Save For Later".
            }
            // Checks if this specific item is NOT a saved item in the saved items array.
            else if(!saved_items.includes(itemContent)){
                $("#saveNutrition" + i).html("Save For Later"); // "Save For Later" button text changed to "Unsave Item".
            }
        }
        
        // Checks for any button click event on the cardio page.
        $("button").click(function(event){
            
            for(i = 1; i <= 3; i++){

                // Checks if the "Save For Later" / "Unsave Item" button for a specific item is clicked.
                // If the specific item already exists in the saved items array, it is removed from the saved items array, and thus removed from the saved items folder.
                // If it does not already exist in the saved items array, it is added to saved items array, and thus added to the saved items folder.
                if(event.target.id == "saveNutrition" + i){

                    // Specific item obtained from array.
                    let itemContent = document.getElementById("nutrition_" + i).innerHTML + "<br><hr><br>";

                    // Checks if specific item has been saved to the saved items array.
                    if(saved_items.includes(itemContent)){
                        $("#" + event.target.id).html("Saved For Later"); // "Unsave Item" button text changed to "Save For Later".

                        let removedIndex = saved_items.indexOf(itemContent);

                        saved_items.splice(removedIndex, 1); // Item removed from saved items array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated saved items array saved to local storage.
                    }
                    else{
                        $("#" + event.target.id).html("Unsave Item"); // "Save For Later" button text changed to "Unsave Item".

                        saved_items.push(itemContent); // Item added to array.

                        localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated saved items array saved to local storage.
                    }

                    // User alerted how many items they currently have in their saved items folder.
                    alert("You have saved " + saved_items.length + " items to your Saved Items folder.");
                }

                // Checks if "Like" / "Unlike" button is clicked.
                // If the "Like" button is clicked, the Like indicator image is shown.
                // If the "Unlike" button is clicked, the Like indicator image is no longer shown.
                if(event.target.id == "btnLikeNutrition" + i){
                    
                    // Checks if current item at index i-1 is NOT already liked.
                    if(nutrition_likes[i-1] == false){

                        nutrition_likes[i-1] = true; // Like status is cardio likes array changed to true.
                        
                        $("#nutritionLike" + i).show().animate({marginLeft: "+=50px"}).animate({marginLeft: "-=50px"}); // Like indicator image is shown and animated.

                        $("#btnLikeNutrition" + i).html("Unlike"); // "Like" button text changed to "Unlike".

                        localStorage.setItem("nutritionLikes", JSON.stringify(nutrition_likes)); // Updated cardio likes array saved to storage.
                    }
                    // Checks if current item at index i-1 is already liked.
                    else if(nutrition_likes[i-1] == true){

                        nutrition_likes[i-1] = false; // Like status is cardio likes array changed to false.
                        
                        $("#nutritionLike" + i).hide(); // Like indicator image is no longer shown.

                        $("#btnLikeNutrition" + i).html("Like"); // "Unlike" button text changed to "Like".

                        localStorage.setItem("nutritionLikes", JSON.stringify(nutrition_likes)); // Updated cardio likes array saved to storage.
                    }
                }
            }
        });
    }
    // Checks if current page is the Contact Us page.
    else if(window.location.href.search("contact_us.html") != -1){

        // If user clicks the "Subscribe" for the Newsletter, the user is notified that they have been subscribed. 
        $("#subscribe").click(function(){
            let fullName = document.getElementById("full_name").value;
            let emailAddress = document.getElementById("email_address").value;
            let radioSelection = document.querySelector("input[name=\"newsletter\"]:checked").value;

            // User is alerted of their subscription.
            alert(`Thank you, ${fullName}!\n\nYour email address (${emailAddress}) has been subscribed to our ${radioSelection} newsletter.`);

        });

        // If the user clicks the Send Email button, they will be directed to their email application on their PC to send an email to the website creator.
        $("#sendEmail").click(function(){
            // Subject retrieved from text field in the Send Email form.
            let subject = document.getElementById("subject").value;

            // Body retrieved from text field in the Send Email form.
            let body = document.getElementById("body").value;
            
            let emailLink = `mailto:deangulston12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.location.href = emailLink; // User is directed to their email application.
        });
    }

});

/*
    References:

    How to check which html document is currently open by checking the url:
    - https://stackoverflow.com/questions/28207770/how-to-check-which-html-is-being-used-from-javascript-file

    How to change the text of a button using jQuery:
    - https://www.tutorialrepublic.com/faq/how-to-change-the-text-of-a-button-using-jquery.php

    How to append a child element to a parent element using jQuery:
    - https://www.w3schools.com/jquery/html_append.asp

    How to send an email using JavaScript:
    - https://stackoverflow.com/questions/271171/sending-emails-with-javascript

    How to get the value of the currently selected radio button:
    - https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button

*/