USE womenDB;

CREATE TABLE women (
    woman_id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    fLetter char(1) NOT NULL,
    wName varchar(255) NOT NULL,
    wParrafo text NOT NULL,
    wBday varchar(255) NOT NULL
);

/* 
    Woman ID = Automatically Generated Unique Record Identifier
    Woman First Letter = First Letter of Woman's Name
    Woman Name
    Woman Parrafo: Paragraph About the Woman
    Woman Bday = Birthday of Woman
*/