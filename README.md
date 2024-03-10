# E-Court System

git workflow:

1. before begin to work on a feature create a branch for it:
   `git branch <branch-name>`
   branch name convention: `bugfix/<...>` or `feat/<...>`
2. add and commit to your branch frequently, whenever you have something that works add and commit. DON't wait until you finish all of the work on the branch.
   `git status` `git add .` `git add <file1> <file2>` `git commit -m "<commit-msg>"` `git push <remote> <branch-name>`
   you can sets the upstream of the local branch so that it tracks that branch on the origin repo, by typing this: `git push -u origin <branch-name>`
3. on frequent basis, move to main pull from remote, back to your branch then merge, and resolve conflicts if there are, so that your branch stays in sync with the main.
4. when you finish working the branch, that is you complete building the feature, open a pull request on the github, DO NOT push directly to the main
5. if you did the above we will not - I hope - face merge conflicts when we merge the branches into the main.

example:
I want to work on register form on the frontend:

1. first the remote repo must be cloned to my local drive
   `git clone git@github.com:MuazAbdin/E-Court-System.git`
2. make sure you are on the main branch: `git switch main`
3. make a new branch and switch to it: `git switch -c feat/registerForm`
4. work on building the form, add, commit, push, frequently.
5. on frequent basis, and when finish working on the feature:
   switch to main: `git switch main` ,
   pull from remote: `git pull orgin main`,
   switch back to my branch: `git switch feat/registerForm`
   merge with main and resolve conflicts: `git merge main`
6. push to remote branch `git push orgin feat/registerForm`
7. go to hithub and open pull request.



## API Routes
#### Data Definitions:
##### StakeholderData: { partyId, idNumber, firstName, lastName, email, phoneNumber, city, street }
##### Stakeholder: { _id, partyId, idNumber, firstName, lastName, email, phoneNumber, city, street }
##### Party: { name, lawyer, caseId, [ Stakeholder ] }
##### UserData: { password, confirmPassword, idNumber, firstName, LastName, userType, email, phoneNumber, city, street, licenseNumber? }
##### User: { _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street }
##### Event: {_id, caseId, eventType, date, description }
##### Document: { _id, caseId, title, uploadedBy, fileName }
##### Case: { _id, title, description ,status, court, judge, creationDate, lastUpdatedDate }
##### Court: { _id, name, city, street, phoneNumber, email }

### Authentication Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Register | /auth/register/ | POST | UserData | firstName, lastName |
| Login | /auth/login/ | POST | email, password | firstName, lastName |
| Logout | /auth/logout/ | POST | | |
JWT-HTTP-Only-Cookie is set after a successful Register or Login

### Case Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Case | /cases/ | POST | title, decription, status, court, judge? | Case |
| Get All Cases | /cases/?caseTitle&status&courtName&judgeName&lawyerName | GET | | [ Case ] |
| Get Case | /cases/:id | GET | | CASE
| Update Case | /cases/ | PATCH | caseId, title, description, status, court, judge | Case |
| Update Case Status | /cases/status/ | PATCH | _id, status | CASE |

### Court Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Court | /courts/ | POST | courtName, city, street, phoneNumber, email | Court |
| Get Court | /court/:id | GET | | Court |
| Update Court | /court/ | Patch | id, name, phoneNumber, email | Court

### Document Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Document | /documents/ | POST | caseId, title, uploadedBy, documentFile | _id, caseId, title, uploadedBy |
| Get Document | /documents/:id | GET | | Document |
| Get User Documents | /documents/user/:id | GET | | Document |
| Get Party Documents | /documents/party/:id | GET | | Document |
| Get Case Documents | /documents/case/:id | GET | | Document |
| Update Document Title | /documents/ | PATCH | id, title | Document |

### Event Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Event | /events/ | POST | caseId, eventType, date, description | Event |
| Get Case Events | /events/case/:id | GET | | [ Event ] |
| Get Event | /events/:id | GET | | Event |
| Update Event | /events/ | PATCH | eventId, date, description | Event |
| Delete Event | /events/ | DELETE | eventId | |

### Party Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Party | /parties/ | POST | partyName, lawyer?, caseId, [ StakeholderData ] | Party |
| Get Case Parties | /parties/case/:id | GET | | [ Party ] |
| Get Party | /parties/:id | GET | | Party |
| Update Party | /parties/ | PATCH | partyId, partyName, lawyer | Party |
| Delete Party | /parties/ | DELETE | partyId | |

### Stakeholder Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Create Stakeholder | /stakeholders/ | POST | StakeholderData | Stakeholder |
| Get Stakeholders By Party | /stakeholders/party/:id | GET |  | [ Stakeholder ] |
| Get Stakeholders | /stakeholders/:id | GET |  | Stakeholder |
| Update Stakeholder | /stakeholders/ | PUT | Stakeholder | Stakeholder |
| Delete Stakeholder | /stakeholder/ | DELETE | stakeholderId | |

### User Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Get Judges | /users/judges | GET | | [ User ] |
| Get Lawyers | /users/lawyers | GET | | [ User ] |
| Get All Users | /users/ | GET | | [ User ] |
| Update User(Admin) | /users/ | PUT | User | User |
| Update User | /users/ | PATCH | phoneNumber, city, street | User |
