<p align="center">
<img src="https://i.imgur.com/3PZ8l8b.png" />
</p>
<br/>
StudyBurgs is an interactive ancestry tree of the Hapsburg dynasty. The user is able to navigate through the family tree and inspect each significant member of the Hapsburgs. All content is presented in an interesting and engaging way, because humans recognize items best by visual stimulation. Notes to each family member can be added, to help the learning progress. Additionally teachers can download their students progress to an Excel file.

## Dependencies

- IntelliJ
- A modern Web Browser like Chrome or Firefox
- Python 3
- Django
- Node.js
- Angular

#### External Libraries

- [ngx-org-chart](https://www.npmjs.com/package/ngx-org-chart)
- [xlsx](https://www.npmjs.com/package/xlsx)
- [file-saver](https://www.npmjs.com/package/file-saver)

## Installation

Clone the GitHub repository and open it up with IntelliJ. Once opened, click on requirements.txt and install the requirements. After that open the package.json, a popup should appear to "npm install" the requirements. The before mentioned external libraries should be installed automatically. If that's not the case run the following command: `npm i ngx-org-chart xlsx file-saver` <br>
To load the needed data into the project run:
```
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata studyburgs/studyburgs/fixtures/habsburgs.json
```
Then build the application, run the Django Server and then the Angular CLI Server. Open the application up by typing localhost:4200 in your browser.

## Usage

There are three different user roles currently present in the project.

 1. Student<br/>
This user can view the family tree, click on specific Habsurgers and read the details. They can also add notes to Habsburgers and check a checkmark if they have leraned them. They are also able to view their progress all the time in the top right corner or on their user page, where there is every note they have written displayed.

 2. Teacher<br/>
A teacher can do everything students can but is also able to see their students progress on the "My Students" page and download it to an excel file. Additionally they have the ability to add new Habsburgers or edit entries of the Family.
3. Administrator<br/>
The administrator can do everything teachers can do.<br/>

### Passwords

 - Student:<br/>
Username: PeterStudent<br/>
Password: Admin123!<br/>
Username: JuliaStudent<br/>
Password: Admin123!<br/>
- Teacher:<br/>
Username: HansLehrer<br/>
Password: Admin123!<br/>
- Administrator:<br/>
Username: admin<br/>
Password: admin<br/>
