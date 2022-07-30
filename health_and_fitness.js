// Array meant for containing a list of the inner HTML of the user's saved items.
let saved_items = [];

// Global array meant for containing a list of the inner HTML of user added comments for the current webpage.
let comments_array = [];

// Global array meant for containing a list of boolean values that indicates which specific items/articles are liked and not liked on the current webpage.
let likes_array = [];

$(document).ready(function(){

    // Number of like buttons on the current page obtained.
    let numberOfLikeButtons = document.querySelectorAll(".likeButton").length;

    // Check if the website has NOT been visited before.
    if(localStorage.getItem("visitedBefore") === null){

        // Website visited status initialized and set to true in local storage.
        localStorage.setItem("visitedBefore", true);
        
        // Saved items array intialized in local storage.
        localStorage.setItem("savedItems", JSON.stringify(saved_items));
        
        // Comments arrays for the index, cardio and nutrition pages initialized in local storage.
        localStorage.setItem("weightsComments", JSON.stringify(comments_array));
        localStorage.setItem("cardioComments", JSON.stringify(comments_array));
        localStorage.setItem("nutritionComments", JSON.stringify(comments_array));

    }
    // Checks if webpage has been visited before.
    else if(JSON.parse(localStorage.getItem("visitedBefore")) === true){
        
        // All previously "saved for later" items are retrieved from local storage and added to the saved items array.
        saved_items = JSON.parse(localStorage.getItem("savedItems"));

    }

    // Checks if the current page is on the Saved For Later page (aka the Saved Items page).
    if(window.location.href.search("save_for_later.html") != -1){
        
        // Functionality of the saved for later page handled.
        handleSaveForLater();

    }
    // Checks if the current page is on the Index page (aka the Weights page).
    else if(window.location.href.search("index.html") != -1){

        // Likes array and comments array are initialized according to whether the index page has been visited yet or not.
        initLocalStorage("weightsComments", "weightsLikes", "indexVisited", numberOfLikeButtons);
        
        // All functionality of index page handled.
        // The index comments array and index likes array local storage variable names are passed as parameters.
        handleArticles("weightsComments", "weightsLikes");

    }
    // Checks if current page is on the Cardio page.
    else if(window.location.href.search("cardio.html") != -1){
        
        // Likes array and comments array are initialized according to whether the cardio page has been visited yet or not.
        initLocalStorage("cardioComments", "cardioLikes", "cardioVisited", numberOfLikeButtons);

        // All functionality of cardio page handled.
        // The cardio comments array and cardio likes array local storage variable names are passed as parameters.
        handleArticles("cardioComments", "cardioLikes");

    }
    // Checks if current page is on the Nutrition page.
    else if(window.location.href.search("nutrition.html") != -1){
        
        // Likes array and comments array are initialized according to whether the nutrition page has been visited yet or not.
        initLocalStorage("nutritionComments", "nutritionLikes", "nutritionVisited", numberOfLikeButtons);
        
        // All functionality of nutrition page handled.
        // The nutrition comments array and nutrition likes array local storage variable names are passed as parameters.
        handleArticles("nutritionComments", "nutritionLikes");
        
    }
    // Checks if current page is the Contact Us page.
    else if(window.location.href.search("contact_us.html") != -1){

        // Functionality of contact us page handled.
        handleContactUs();
        
    }

});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Functionality for contact us page handled here.
// Notifies user when they subscribe to a newsletter and allows user to write and send an email to the author of the website.
function handleContactUs(){
    
    // If user clicks the "Subscribe" for the Newsletter, the user is notified that they have been subscribed. 
    $("#subscribe").click(function(){
        let fullName = document.getElementById("full_name").value;
        let emailAddress = document.getElementById("email_address").value;
        let radioSelection = document.querySelector("input[name=\"newsletter\"]:checked").value; // Obtains currently selected radio button.

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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Functionality for the saved for later page handled here.
// Renders all saved items on the saved for later page.
function handleSaveForLater(){
    
    // Each user saved item is retrieved from the saved items array and appended to the savedItems div.
    saved_items.forEach(function(item){
        let savedForLater = document.getElementById("savedItems");

        let newDiv = document.createElement("div");
        
        newDiv.innerHTML += item;

        savedForLater.appendChild(newDiv);

    });

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Local storage variable names for the page-specific comments array, likes array and page visited status, as well as the number
// of like buttons on the current webpage are all passed as parameters.
// If the current webpage has not been visited yet, the likes array is initialized in local storage.
// If the current webpage has been visited before, the likes array and comments array are retrieved from local storage.
function initLocalStorage(localStorageComments, localStorageLikes, pageVisited, numLikeButtons){
    
    // Checks if the current page has been visited yet.
    if(localStorage.getItem(pageVisited) === null){
        // The current webpage's visited status set to true.
        localStorage.setItem(pageVisited, true);
        
        // All like status values set to false, as none of the items/articles have been liked by the user yet.
        for(i = 0; i < numLikeButtons; i++){
            likes_array.push(false);
        }

        // Likes array saved to local storage.
        localStorage.setItem(localStorageLikes, JSON.stringify(likes_array));

        // All like indicators are hidden from the webpage, as none of the items/articles have been liked by the user yet.
        $(".likedImg").hide();
    }
    else if(JSON.parse(localStorage.getItem(pageVisited)) === true){
        // Likes array retrieved from local storage.
        likes_array = JSON.parse(localStorage.getItem(localStorageLikes));

        // Comments array retrieved from local storage.
        comments_array = JSON.parse(localStorage.getItem(localStorageComments));
    }

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// All functionality of the index, cardio and nutrition webpages are handled here.
// The page-specific (either index, cardio or nutrition) local storage variable names for the comments array and likes array are passed as parameters.
function handleArticles(localStorageComments, localStorageLikes){
    
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
    
    // Each user added comment that was added to the page is retrieved from the comments array and appended to the comment section.
    comments_array.forEach(function(comment){
        $("#commentSection").append(comment);
    });
    
    // Whenever the add comment button is clicked on the page, the user's name and comment is added to the comments array, and the updated comments array is saved to local storage.
    $("#submitComment").click(function(){

        // User's name and comment obtained from comment section form.
        let userName = document.getElementById("userName").value;
        let userComment = document.getElementById("userComment").value;

        // Checks that the user's name and comment is not a blank string.
        if(userName != "" && userComment != ""){
            let newComment = document.createElement("div");

            newComment.innerHTML += `<q>${userComment}</q><br>&mdash; <i>${userName}</i><br><br>`;

            comments_array.push(newComment.innerHTML); // New user comment is pushed to the comments array.

            localStorage.setItem(localStorageComments, JSON.stringify(comments_array)); // Updated comments array saved to local storage.
        }
    });
    
    for(i = 1; i <= likes_array.length; i++){
        // Checks if the like status of an item/article on the page is true. If true, the like indicator image is shown.
        // We use index i-1 since the array starts at index i=0, but the id of the like button and like indicator starts with an index of i=1, i.e. btnLike1 and Like1.
        if(likes_array[i-1] == true){
            $("#Like" + i).show(); // Like indicator image shown.

            $("#btnLike" + i).html("Unlike"); // "Like" button text changes to "Unlike".

        }
        // Checks if the like status of an item/article on the page is false. If false, the like indicator image is no longer shown.
        else if(likes_array[i-1] == false){
            $("#Like" + i).hide(); // Like indicator not shown.

            $("#btnLike" + i).html("Like"); // "Unike" button text changes to "Like".

        }

        // A specific item/article on the webpage with id article_i is obtained.
        let itemContent = document.getElementById("article_" + i).innerHTML + "<br><hr><br>";

        // Checks if this specific item is a saved item in the saved items array.
        if(saved_items.includes(itemContent)){
            $("#save" + i).html("Unsave Item"); // "Save For Later" button text set to "Unsave Item".
        }
        // Checks if this specific item is NOT a saved item in the saved items array.
        else if(!saved_items.includes(itemContent)){
            $("#save" + i).html("Save For Later"); // "Unsave Item" button text set to "Save For Later."
        }

    }

    // Checks for any button click event on the index page.
    $("button").click(function(event){
        
        for(i = 1; i <= likes_array.length; i++){

            // Checks if the "Save For Later" / "Unsave Item" button for a specific item is clicked.
            // If the specific item already exists in the saved items array, it is removed from the saved items array, and thus removed from the saved items folder.
            // If it does not already exist in the saved items array, it is added to saved items array, and thus added to the saved items folder.
            if(event.target.id == "save" + i){

                // Specific item/article obtained from array.
                let itemContent = document.getElementById("article_" + i).innerHTML + "<br><hr><br>";

                // Checks if specific item/article has been saved to the saved items array.
                if(saved_items.includes(itemContent)){
                    
                    $("#" + event.target.id).html("Saved For Later"); // "Unsave Item" button text changed to "Save For Later".

                    let removedIndex = saved_items.indexOf(itemContent);

                    saved_items.splice(removedIndex, 1); // Saved item/article removed from array.

                    localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
                }
                else{
                    $("#" + event.target.id).html("Unsave Item"); // "Save For Later" button text changed to "Unsave Item".

                    saved_items.push(itemContent); // Item/article added to array.

                    localStorage.setItem("savedItems", JSON.stringify(saved_items)); // Updated array saved to local storage.
                }

                alert("You have saved " + saved_items.length + " items to your Saved Items folder."); // User told how many items they have in their saved items folder.


            }

            // Checks if "Like" / "Unlike" button is clicked.
            // If the "Like" button is clicked, the Like indicator image is shown.
            // If the "Unlike" button is clicked, the Like indicator image is no longer shown.
            if(event.target.id == "btnLike" + i){
                
                // Checks if current item at index i-1 is NOT already liked.
                // We use index i-1 since the array starts at index i=0, but the id of the like button starts with an index of i=1, i.e. btnLike1.
                if(likes_array[i-1] == false){
                    
                    likes_array[i-1] = true; // Like status in weights likes array changed to true.
                    
                    $("#Like" + i).show().animate({marginLeft: "+=50px"}).animate({marginLeft: "-=50px"}); // Like indicator image is shown and animated.

                    $("#btnLike" + i).html("Unlike"); // "Like" button text changed to "Unlike".

                    localStorage.setItem(localStorageLikes, JSON.stringify(likes_array)); // Updated likes array saved to storage.
                }
                // Checks if current item at index i-1 is already liked.
                else if(likes_array[i-1] == true){
                    
                    likes_array[i-1] = false; // Like status is likes array changed to true.
                    
                    $("#Like" + i).hide(); // Like indicator image no longer shown.

                    $("#btnLike" + i).html("Like"); // "Unlike" button text changed to "Like".

                    localStorage.setItem(localStorageLikes, JSON.stringify(likes_array)); // Updated likes array saved to local storage.
                }
            }

        }
    });
}

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