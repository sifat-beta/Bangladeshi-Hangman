document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const categorySelectionDiv = document.getElementById('category-selection');
    const categoryButtonsDiv = document.getElementById('category-buttons');
    const gameAreaDiv = document.getElementById('game-area');
    const currentCategorySpan = document.getElementById('current-category');
    const timeLeftSpan = document.getElementById('time-left');
    const currentScoreSpan = document.getElementById('current-score');
    const hintsCountSpan = document.getElementById('hints-count');
    const hangmanParts = document.querySelectorAll('.hangman-part');
    const wordDisplayDiv = document.getElementById('word-display');
    const guessedLettersSpan = document.querySelector('#guessed-letters span');
    const keyboardDiv = document.getElementById('keyboard');
    const hintBtn = document.getElementById('hint-btn');
    const nextRoundBtn = document.getElementById('next-round-btn');
    const messageAreaDiv = document.getElementById('message-area');
    const achievementsList = document.getElementById('achievements-list');

    // --- Game Data ---
    const categories = {
        "Cities and Landmarks": ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh", "Comilla", "Narayanganj", "Bogra", "Dinajpur", "Jessore", "Tangail", "Jamalpur", "Pabna", "Kushtia", "Feni", "Noakhali", "Chandpur", "Lakshmipur", "Brahmanbaria", "Narsingdi", "Gazipur", "Munshiganj", "Madaripur", "Faridpur", "Gopalganj", "Shariatpur", "Magura", "Jhenaidah", "Narail", "Chuadanga", "Meherpur", "Pirojpur", "Bagerhat", "Jhalokati", "Patuakhali", "Barguna", "Bhola", "Bandarban", "Rangamati", "Khagrachari", "Coxs Bazar", "Sunamganj", "Habiganj", "Moulvibazar", "Netrokona", "Kishoreganj", "Sherpur"],
        "Geography": ["Ganges Delta", "Padma River", "Jamuna River", "Meghna River", "Brahmaputra", "Karnaphuli", "Bay of Bengal", "Sundarbans", "Chittagong Hills", "Madhupur Forest", "Satchari", "Lawachara", "Rema Kalenga", "Kaptai Lake", "Saint Martin", "Hakaluki Haor", "Tanguar Haor", "Sylhet Division", "Khulna Division", "Rajshahi Division", "Dhaka Division", "Barisal Division", "Rangpur Division", "Mymensingh Division", "Chittagong Division", "Teesta River", "Surma River", "Mangrove", "Ratargul", "Nijhum Dwip", "Teknaf Peninsula", "Inani Beach", "Kuakata Beach", "Foys Lake", "Khadimnagar", "Bhawal", "Modhupur", "Himchari", "Sajek Valley", "Jaflong", "Bichanakandi", "Monsoon", "Tropical", "Floodplain", "Marshland", "Coastal Area", "Alluvial Soil", "Silt Deposit", "Riverine", "Wetland"],
        "Cultural Festivals": ["Pohela Boishakh", "Durga Puja", "Eid ul Fitr", "Eid ul Adha", "Nobanno Utsab", "Victory Day", "Shaheed Dibosh", "Ekushey February", "Boi Mela", "Shakrain", "Buddha Purnima", "Rash Mela", "Baisabi", "Mother Language Day", "Independence Day", "Bengali Wedding", "Boro Din", "Muharram", "Shab e Barat", "Rabindra Jayanti", "Nazrul Jayanti", "Baishakhi Mela", "Charak Puja", "Lathikhela", "Holi", "Janmashtami", "Saraswati Puja", "Lakshmi Puja", "Kali Puja", "Shivratri", "Gajan", "Jhulan Jatra", "Dol Purnima", "Maghi Purnima", "Kartik Brati", "Nabanna", "Poush Mela", "Monipuri Dance", "Baul Song Festival", "Jatiya Shaheed Dibosh", "Basanta Utsab", "Lalon Smaran Utshab", "Joy Bangla Concert", "Ekushey Boi Mela", "Pahela Falgun", "Nouka Baich", "Poush Shankranti", "Republic Day", "Martyrs Day", "Armed Forces Day"],
        "Traditional Food": ["Biryani", "Panta Bhat", "Hilsa Fish", "Kacchi Biryani", "Morog Polao", "Puchka", "Paratha", "Bhuna Khichuri", "Chingri Malai Curry", "Sorshe Ilish", "Beef Kala Bhuna", "Haleem", "Pitha", "Mishti", "Chholar Dal", "Shutki Bhuna", "Koi Macher Curry", "Machher Jhol", "Beef Chui Jhal", "Chicken Roast", "Mutton Curry", "Rui Bhaja", "Gorur Kolija Bhuna", "Tehari", "Lal Bhaat", "Bhaat", "Gorur Vuri Bhaja", "Shing Macher Jhol", "Magur Macher Jhol", "Pangas Bhuna", "Horioh Machh", "Ilish Bhaja", "MashKalai Daal", "Dal", "Fulkopi Shing Mach", "Chicken Curry", "Beef Curry", "Korma", "Polao", "Bhuna", "Vorta", "Patla Khichuri", "Doi Chira", "Falooda", "Rasmalai", "Borhani", "Shami Kabab", "Chutney", "Jilapi", "Chomchom", "Sandesh"],
        "Traditional Clothing": ["Sari", "Jamdani Sari", "Lungi", "Panjabi", "Salwar Kameez", "Taant Sari", "Katan Sari", "Dhuti", "Chadar", "Shalwar", "Prayer Cap", "Shawl", "Muslin", "Silk Sari", "Cotton Sari", "Tangail Sari", "Monipuri Sari", "Nakshi Kantha", "Pajama", "Bindi", "Gamcha", "Pagri", "Ghagra Choli", "Lehenga", "Kurta", "Fatua", "Fotua", "Dupatta", "Chunri", "Uttariya", "Dhakeshwari Sari", "Rajshahi Silk", "Khadi", "Baluchari Sari", "Kota Sari", "Benarasi Sari", "Nokshikantha Sari", "Dhakai Sari", "Kurti", "Churidar", "Thami", "Pinon", "Khobong", "Wanglai", "Risa", "Angi", "Gena", "Dakmunda", "Ganna Dakka"],
        "Famous Landmarks": ["National Parliament", "Lalbagh Fort", "Ahsan Manzil", "Shaheed Minar", "Somapura Mahavihara", "Sixty Dome Mosque", "Shat Gombuj Mosque", "Paharpur Buddhist Vihara", "Mahasthangarh", "Kantaji Temple", "Mainamati Ruins", "Sonargaon", "Bagha Mosque", "Central Shaheed Minar", "National Museum", "Bara Katra", "Chhota Katra", "Husaini Dalan", "Star Mosque", "Armenian Church", "Dhakeshwari Temple", "Khan Jahan Ali Tomb", "Hardinge Bridge", "Jamuna Bridge", "Padma Bridge", "Curzon Hall", "Jatiyo Smriti Soudho", "Martyred Intellectuals Memorial", "Liberation War Museum", "Bangladesh National Zoo", "Baldha Garden", "Ramna Park", "Suhrawardy Udyan", "Hatirjheel", "Bangabandhu Memorial Museum", "Rose Garden Palace", "Natore Rajbari", "Puthia Temple Complex", "Tajhat Palace", "Shilaidaha Kuthibari", "Baitul Mukarram", "Bandarban Golden Temple", "Ronvijoypur Mosque", "Kusumba Mosque", "Panam City", "Bhubaneshwar Shiva Temple", "Pancharatna Gobinda Temple", "Jatiyo Sangshad Bhaban", "Bashundhara City", "Jahaj Bari", "Crimson Cup", "North End", "Gabtoli Cattle Market", "Jamuna Future Park", "Sarah Resort", "Sayeman Beach Resort", "Dhanmondi Lake", "Police Plaza Concord", "Mustafa Mart", "Eastern Plaza", "Mouchak Market", "Dhaka New Super Market", "Shimanto Square", "Polwel Shopping Center", "Rafi Tower Shopping Complex", "Metro Shopping Mall", "Chuti Resort", "Dream Square Resort", "The Heritage Resort", "Bhawal Resort Spa", "Resort Atlantis", "Cculb Resort Convention Hall", "Green View Resort Convention Center", "Bagan Bilash Resort", "Namir Holiday Resort", "Fantasy Kingdom", "Zinda Park", "Bangabandhu Sheikh Mujib Safari Park", "Moinot Ghat", "Baliati Jamidar Bari", "Keranigonj", "Toggi Fun World"],
        "Wildlife": ["Royal Bengal Tiger", "Asian Elephant", "Gaur", "Pig tailed Macaque", "Phayres Leaf Monkey", "Capped Langur", "Hoolock Gibbon", "Fishing Cat", "Black Giant Squirrel", "Greater Adjutant Stork", "Oriental Pied Hornbill", "Kalij Pheasant", "Flowerpecker", "Cuckoo", "Hooded Pitta", "White rumped Vulture", "Magpie Robin", "Saltwater Crocodile", "Gangetic Dolphin", "Irrawaddy Dolphin", "Clouded Leopard", "Leopard Cat", "Jungle Cat", "Golden Jackal", "Sloth Bear", "Rhesus Macaque", "Spotted Deer", "Sambar Deer", "Barking Deer", "Wild Boar", "Pangolin", "Indian Python", "King Cobra", "Bengal Monitor", "Gharial", "Olive Ridley Turtle", "Bengal Fox", "Smooth coated Otter", "Flying Fox", "Masked Finfoot", "Mangrove Species", "Swamp Deer", "Hog Badger", "Himalayan Black Bear", "Marbled Cat", "Binturong", "Slow Loris", "Malayan Sun Bear", "Asiatic Black Bear", "Dhole"],
        "Sports and Games": ["Cricket", "Football", "Kabaddi", "Hockey", "Hadudu", "Bangladesh Games", "Premier League", "National Cricket League", "Dhaka Premier League", "Bangladesh Premier League", "Federation Cup", "Independence Cup", "National Championship", "Super Cup", "Victory Day Tournament", "Olympic Games", "Asian Games", "Commonwealth Games", "South Asian Games", "Islamic Solidarity Games", "Dariabandha", "Gollachut", "Danguli", "Boli Khela", "Nouka Baich"],
        "Famous Personalities": ["Sheikh Mujibur Rahman", "Ziaur Rahman", "Kazi Nazrul Islam", "Rabindranath Tagore", "Begum Rokeya", "Zainul Abedin", "Humayun Ahmed", "Lalon Shah", "Jasimuddin", "Muhammad Yunus", "Fazlur Rahman Khan", "Abul Hussam", "Jawed Karim", "Salman Khan", "Tahmima Anam", "Monica Ali", "Taslima Nasrin", "Runa Laila", "Shakib Khan", "Jaya Ahsan", "Chanchal Chowdhury", "Mosharraf Karim", "Tahsan Khan", "Arifin Shuvoo", "Bidya Sinha Saha Mim", "Tareque Masud", "Azam Khan", "Sabina Yasmin", "Ayub Bachchu", "Mayor Anisul Hoque", "Humayun Azad", "Mayor Hanif", "Ananta Jalil", "Hero Alom", "Sheikh Hasina", "Khaleda Zia", "Hussain Muhammad Ershad", "Abul Maal Abdul Muhith", "Badruddin Mohammad Umar", "Naveed Mahbub", "Amin Hannan Chowdhury", "Abu Hena Rony", "Raba Khan", "Niloy Alamgir", "Anamika Oyshe", "Farjana Akter", "Shamima Afrin Omi", "Samira Khan Mahi", "Abu Sayed", "Ashraful Haque Emu", "Tashdid Ashrar", "Sharar Shayor", "Salman Muqtadir", "Sami Doha", "Nilima Rafi", "Shakib Al Hasan", "Mashrafe Mortaza", "Pinaki Bhattacharya", "Novera Ahmed", "Abrar Fahad", "Professor Jamal Nazrul Islam", "Mir Abdus Shukur Al Mahmud", "Sir Fazle Hasan Abed", "Mohammad Mahbubul Haque Khan", "Shah Ahmad Shafi", "Junaid Babunagari", "Muhibbullah Babunagari", "Abdul Halim Bukhari", "Prito Reza", "Mithila", "Siam Ahmed", "Meher Afroz Shaon", "Apu Biswas", "Ferdous Ahmed", "Bulbul Ahmed", "Chowdhury Muhammad Shahriar Emon", "Farid Ali", "Dildar", "Abdul Ali Lalu", "Tele Samad", "Hanif Sanket"],
        "Historical Terms": ["Mukti Bahini", "Liberation War", "Independence", "East Pakistan", "Bengal Partition", "Nawabs of Bengal", "Mughal Empire", "British East India Company", "Bengal Presidency", "Bengal Sultanate", "Battle of Plassey", "Siraj ud Daulah", "Language Movement", "Six Point Movement", "Operation Searchlight", "Genocide of 1971", "Proclamation of Independence", "Instrument of Surrender", "Bangabandhu", "Bengal Renaissance", "Zamindars", "Ilyas Shahi Dynasty", "Raja Ganesha", "Nasiruddin Mahmud Shah", "Aurangzeb", "Jahangir", "Khan Jahan Ali", "Bengal Famine", "Partition of India", "Diwan", "Sarkar", "Pargana", "Mouza", "Thana", "Awami League", "Bangladesh Nationalist Party", "Jatiya Party", "Constituent Assembly", "Constitution", "Caretaker Government", "Military Rule", "Democracy Movement", "Chittagong Armoury Raid", "Tebhaga Movement", "Non Cooperation Movement", "Swadeshi Movement", "Direct Action Day", "Great Calcutta Killings", "Noakhali Riots", "United Bengal Movement"]
    };
    const achievementCriteria = {
        cultural_expert: { category: "Cultural Festivals", count: 10 },
        geography_guru: { category: "Geography", count: 10 },
        foodie_master: { category: "Traditional Food", count: 10 },
        // Others tracked during gameplay check
    };

    // --- Game State ---
    let currentWord = '';
    let currentCategory = '';
    let guessedLetters = [];
    let correctLetters = [];
    let wrongGuesses = 0;
    let hintsRemaining = 3;
    let score = 0;
    let timerId = null;
    let timeLeft = 0;
    let gameActive = false;
    let categoryWinCounts = {}; // To track wins per category for achievements
    let achievements = loadAchievements(); // Load from localStorage

    const MAX_WRONG_GUESSES = 6; // Head, Torso, 2 Arms, 2 Legs

    // --- Functions ---

    // Load achievements from localStorage
    function loadAchievements() {
        const saved = localStorage.getItem('hangmanAchievements');
        if (saved) {
            return JSON.parse(saved);
        } else {
            // Initialize default achievement states
            const defaultAchievements = {};
            document.querySelectorAll('#achievements-list li').forEach(li => {
                defaultAchievements[li.dataset.achievement] = false; // All start locked
            });
            return defaultAchievements;
        }
    }

    // Save achievements to localStorage
    function saveAchievements() {
        localStorage.setItem('hangmanAchievements', JSON.stringify(achievements));
    }

    // Update achievement display
    function updateAchievementsDisplay() {
        for (const key in achievements) {
            const li = achievementsList.querySelector(`li[data-achievement="${key}"]`);
            if (li) {
                const statusSpan = li.querySelector('span');
                if (achievements[key]) {
                    statusSpan.textContent = '🏆'; // Unlocked icon
                    statusSpan.className = 'unlocked';
                } else {
                    statusSpan.textContent = '🔒'; // Locked icon
                    statusSpan.className = 'locked';
                }
            }
        }
        // Also save whenever updated
        saveAchievements();
    }

    // Unlock achievement
    function unlockAchievement(key) {
        if (!achievements[key]) {
            console.log(`Achievement Unlocked: ${key}`);
            achievements[key] = true;
            // Maybe show a temporary notification on screen?
            updateAchievementsDisplay();
        }
    }

    // Check achievements related to game end state
    function checkEndGameAchievements(win) {
        if (win) {
            // Quick Guesser
            if (timeLeft > 30) {
                unlockAchievement('quick_guesser');
            }
            // Perfect Round
            if (wrongGuesses === 0) {
                unlockAchievement('perfect_round');
            }
            // Category specific achievements
            categoryWinCounts[currentCategory] = (categoryWinCounts[currentCategory] || 0) + 1;
            for (const key in achievementCriteria) {
                const criteria = achievementCriteria[key];
                if (criteria.category && criteria.category === currentCategory) {
                    if (categoryWinCounts[currentCategory] >= criteria.count) {
                        unlockAchievement(key);
                    }
                }
            }
        }
    }


    // Create category buttons
    function displayCategorySelection() {
        categoryButtonsDiv.innerHTML = ''; // Clear previous buttons
        Object.keys(categories).forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.addEventListener('click', () => selectCategory(category));
            categoryButtonsDiv.appendChild(button);
        });
        categorySelectionDiv.classList.remove('hidden');
        gameAreaDiv.classList.add('hidden');
        updateAchievementsDisplay(); // Show initial state
    }

    // Select category and start the first round
    function selectCategory(category) {
        currentCategory = category;
        categorySelectionDiv.classList.add('hidden');
        gameAreaDiv.classList.remove('hidden');
        startRound();
    }

    // Start a new round
    function startRound() {
        gameActive = true;
        wrongGuesses = 0;
        hintsRemaining = 3;
        guessedLetters = [];
        currentCategorySpan.textContent = currentCategory;
        hintsCountSpan.textContent = hintsRemaining;
        messageAreaDiv.textContent = '';
        messageAreaDiv.className = 'message-area'; // Reset class
        nextRoundBtn.classList.add('hidden');
        hintBtn.disabled = false;


        // Pick a random word
        const wordsInCategory = categories[currentCategory];
        currentWord = wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)].toUpperCase();
        console.log("Word to guess:", currentWord); // For debugging

        // Initialize correctLetters array with underscores/revealed non-alpha chars
        correctLetters = currentWord.split('').map(letter => {
            if (letter.match(/[A-Z]/i)) {
                return '_';
            } else {
                return letter; // Reveal spaces, hyphens, etc. immediately
            }
        });


        // Reset UI elements
        renderWordDisplay();
        renderKeyboard();
        renderHangman();
        guessedLettersSpan.textContent = '';


        // Start Timer
        const baseTime = currentWord.length <= 10 ? 60 : 90;
        startTimer(baseTime);
    }

    // Render the word display (_ _ A _ etc.)
    function renderWordDisplay() {
        wordDisplayDiv.innerHTML = correctLetters
            .map(letter => `<span class="${letter === ' ' ? 'space' : ''}">${letter}</span>`)
            .join('');
    }

    // Render the virtual keyboard
    function renderKeyboard() {
        keyboardDiv.innerHTML = ''; // Clear previous
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.dataset.letter = letter; // Store letter in data attribute
            button.disabled = guessedLetters.includes(letter); // Disable if already guessed
            button.addEventListener('click', handleGuess);
            keyboardDiv.appendChild(button);
        });
    }

    // Render hangman based on wrong guesses
    function renderHangman() {
        hangmanParts.forEach((part, index) => {
            part.classList.toggle('visible', index < wrongGuesses);
        });
    }

    // Handle letter guess from keyboard click
    function handleGuess(event) {
        if (!gameActive) return;

        const guessedLetter = event.target.dataset.letter;

        // Prevent re-guessing or guessing non-letters
        if (!guessedLetter || guessedLetters.includes(guessedLetter)) {
            return;
        }

        // Disable the button
        event.target.disabled = true;

        // Add to guessed list
        guessedLetters.push(guessedLetter);
        guessedLettersSpan.textContent = guessedLetters.join(', ');

        // Check if letter is in the word
        if (currentWord.includes(guessedLetter)) {
            // Correct guess
            correctLetters = correctLetters.map((letter, index) =>
                currentWord[index] === guessedLetter ? guessedLetter : letter
            );
            renderWordDisplay();
            // Add points (e.g., 10 per correct letter revealed)
            score += 10 * currentWord.split(guessedLetter).length -1; // Simple scoring
             updateScoreDisplay();

        } else {
            // Incorrect guess
            wrongGuesses++;
            renderHangman();
        }

        checkGameState();
    }

    // Handle hint button click
    function handleHint() {
        if (!gameActive || hintsRemaining <= 0) return;

        hintsRemaining--;
        hintsCountSpan.textContent = hintsRemaining;

        // Find letters in the word that haven't been guessed yet
        const hiddenLetters = [];
        currentWord.split('').forEach((letter, index) => {
            if (letter.match(/[A-Z]/i) && correctLetters[index] === '_') {
                hiddenLetters.push(letter);
            }
        });

        if (hiddenLetters.length > 0) {
            // Pick a random hidden letter to reveal
            const letterToReveal = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];

            // Reveal the first instance of that letter
            let revealed = false;
             correctLetters = correctLetters.map((letter, index) => {
                if (!revealed && currentWord[index] === letterToReveal && letter === '_') {
                    revealed = true;
                    // Mark this letter as guessed visually on the keyboard
                    const keyButton = keyboardDiv.querySelector(`button[data-letter="${letterToReveal}"]`);
                    if (keyButton && !keyButton.disabled) {
                         keyButton.disabled = true;
                         if (!guessedLetters.includes(letterToReveal)) guessedLetters.push(letterToReveal); // Add to guessed list if not already
                         guessedLettersSpan.textContent = guessedLetters.join(', ');
                    }
                    return letterToReveal;
                }
                return letter;
            });

            renderWordDisplay();
            checkGameState(); // Check if hint revealed the last letter
        }

        // Disable hint button if no hints left
        if (hintsRemaining === 0) {
            hintBtn.disabled = true;
        }
    }

    // Check if the game is won or lost
    function checkGameState() {
        // Win condition: no underscores left in correctLetters
        const isWin = !correctLetters.includes('_');
        // Lose condition: max wrong guesses reached
        const isLoss = wrongGuesses >= MAX_WRONG_GUESSES;

        if (isWin || isLoss) {
            gameActive = false;
            stopTimer();
            checkEndGameAchievements(isWin); // Check achievements before showing message

            if (isWin) {
                messageAreaDiv.textContent = `You guessed it! The word was: ${currentWord}`;
                messageAreaDiv.classList.add('win');
                // Add bonus score for winning, maybe based on time/guesses left
                 score += (MAX_WRONG_GUESSES - wrongGuesses) * 15 + Math.floor(timeLeft/2); // Bonus points
                 updateScoreDisplay();
            } else {
                messageAreaDiv.textContent = `Game Over! The word was: ${currentWord}`;
                messageAreaDiv.classList.add('lose');
                 // Deduct points for losing? Maybe not. Score stays as is.
            }
             nextRoundBtn.classList.remove('hidden'); // Show next round button
        }
    }


    // Start the game timer
    function startTimer(duration) {
        stopTimer(); // Clear any existing timer first
        timeLeft = duration;
        timeLeftSpan.textContent = timeLeft;
        timeLeftSpan.classList.remove('low-time'); // Reset low time warning


        timerId = setInterval(() => {
            timeLeft--;
            timeLeftSpan.textContent = timeLeft;

             // Add warning class when time is low
             if (timeLeft <= 10) {
                timeLeftSpan.classList.add('low-time');
            }

            if (timeLeft <= 0) {
                stopTimer();
                gameActive = false;
                 messageAreaDiv.textContent = `Time's up! The word was: ${currentWord}`;
                 messageAreaDiv.classList.add('lose');
                 renderHangman(); // Make sure full hangman is shown if timer runs out mid-guess
                 nextRoundBtn.classList.remove('hidden');
                 checkEndGameAchievements(false); // Check loss achievements
            }
        }, 1000);
    }

    // Stop the game timer
    function stopTimer() {
        clearInterval(timerId);
        timerId = null;
    }

     // Update score display
     function updateScoreDisplay() {
        currentScoreSpan.textContent = score;
    }


    // --- Event Listeners ---
    hintBtn.addEventListener('click', handleHint);
    nextRoundBtn.addEventListener('click', startRound); // Next round starts with same category

    // --- Initial Setup ---
    displayCategorySelection(); // Start by showing categories

});