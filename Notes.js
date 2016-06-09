
var NotesManager = (function () {
// "help" button click handler
    function handleOpenHelp(evt) {
        if (!$("#help").is(":visible")) {
            evt.preventDefault();
            evt.stopPropagation();
            showHelp();
        }
    }


    function showHelp() {
        //Show the 'help' div
        $('#help').show();

        //Register a new event listener to watch for clicks on the capturing phase
        document.addEventListener('click', function ev_handler(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();

            //Remove the listener
            document.removeEventListener('click', ev_handler, true);
            //Call hideHelp() when this event occurs
            hideHelp();
        }, true);

    }

    function hideHelp() {
        $("#help").hide();
    }

//Handle keypress on 'note' input element
    function handleEnter(ev) {

        //If the 'enter' button is pressed
        if (ev.which === 13) {
            addCurrentNote();
        }
    }

//Add note handler
    function handleAddNote(ev) {
        addCurrentNote();

    }

    function addCurrentNote() {
        //Get the 'note' from the '#note' element
        var curr_note = $('#note').val();

        if (curr_note) {
            //Add the 'note' value to the `notes` data
            notes.push(curr_note);
            addNote(curr_note);
            $("#note").val("");
        }
    }

    function addNote(curr_note) {
        $("#notes").prepend(
            /*" <a class='note' href='#'>" + curr_note + "</a>"*/
            $("<a href='#'></a>")
                .addClass("note")
                .text(curr_note)
        );
    }


    function handleDocumentClick() {

        $("#notes").removeClass("active");
        $("#notes").children(".note").removeClass("highlighted");
    }


    function handleNoteClick(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        $("#notes").addClass("active");
        $("#notes").children(".note").removeClass("highlighted");
        $(evt.target).addClass("highlighted");
    }


//The parent method -- init()
    function init(args) {
        // build the initial list from the existing `notes` data
        var html = "";
        $notes = $(args.notes),
            $new_note = $(args.new_note),
            $add_note = $(args.add_note),
            $help = $(args.help),
            $open_help = $(args.open_help);

        for (var i = 0; i < notes.length; i++) {
            html = html + " <a class='note' href='#'>" + notes[i] + "</a>";
        }

        //Insert the list to the notes div
        $notes.html(html);

        // listen to "help" button
        $open_help.on('click', handleOpenHelp);

        // listen to "add" button
        $add_note.on('click', handleAddNote);

        // listen for <enter> in text box
        $new_note.on('keypress', handleEnter);

        // listen for clicks outside the notes box
        $(document).on('click', handleDocumentClick);

        // listen for clicks on note elements
        $notes.on('click', '.note', handleNoteClick);
    }

    //Load the data locally
    function loadData(data) {
        for (var i = 0; i < data.length; i++) {
            notes.push(data[i]);
        }
    }

    // private `notes` data
    var notes = [],

    // DOM references
        $notes,
        $new_note,
        $add_note,
        $help,
        $open_help,

    //public API
        publicAPI = {
            init: init,
            loadData: loadData
        };

    return publicAPI;
})();


//Assume this data comes from the database
NotesManager.loadData([
    "My first note!",
    "Where there is a will, there is a 'high' way!",
    "The quick brown fox jumped over the moon."
]);


$(document).ready(function () {
    NotesManager.init({
        notes: "#notes",
        new_note: "#note",
        add_note: "#add_note",
        help: "#help",
        open_help: "#open_help"
    });
});
