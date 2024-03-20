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

### Authentication Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Register | /auth/register/ | POST | password, passwordConfirm, IDcard, firstName, lastName, userType, email, mobile, city, street, licenseNumber | firstName, lastName, userType |
| Login | /auth/login/ | POST | IDcard, password | firstName, lastName, userType |
| Logout | /auth/logout/ | POST | | |
| Log in with google | /auth/google | POST | credential, client_id | 
JWT-HTTP-Only-Cookie is set after a successful Register or Login

### Case Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Case | /cases/ | POST | title, description, status, court, judge, parties: [ { lawyer, client: { idNumber, firstName, lastName, email, phoneNumber } } ] | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Court Manager |
| File a Case | /cases/file-a-case | POST | title, description, court,  parties: [ { client: { idNumber, firstName, lastName, email, phoneNumber } } ] | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Lawyer |
| Get All Cases | /cases/?offset&limit&query&start&end&status | GET | | [ [ _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt ] ] | Court Manager |
| Get User Cases | /cases/user/?offset&limit&query&start&end&status | GET | | [ _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt ] | Lawyer, Judge |
| Get Pending Cases | /cases/pending/?offset&limit&query&start&end&status | GET | | [ _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt ] | Court Manager |
| Get Case | /cases/:id | GET | | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Court Manager, Lawyer |
| Update Case | /cases/ | PATCH | caseId, title, description, status, court, judge | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Court Manager |
| Update Case Status | /cases/status/ | PATCH | _id, status | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Court Manager, Judge |
| Update Case Note | /cases/note/ | PATCH | caseId, note | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Lawyer, Judge |
| Resolve/Review Pending Case | /cases/resolve-pending | PATCH | caseId, status, judge | _id, status, title, description, court, judge, events, parties, caseNumber, judgeNote, claimantLawyerNote, respondentLawyerNote, createdAt, updatedAt | Court Manager |

### Case Respond Routes ( respondent Lawyer applying to a case )
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Apply to Case as a respondent Lawyer | /case-responds/ | POST | caseNumber | | Lawyer |
| Get respondent Lawyers Applying to Cases | /case-responds/ | GET | | | Court Manager |
| Approve respondent Lawyer | /case-responds/review/ | PATCH | approve, caseRespondId | | Court Manager |

### Court Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Court | /courts/ | POST | courtName, city, street, mobile, email, judges? | _id, name, city, street, phoneNumber, judges, email | Court Manager |
| Get Court | /courts/:id | GET | | _id, name, city, street, phoneNumber, judges, email | Lawyer, Judge , Court Manager |
| Update Court | /courts/ | Patch | id, name, phoneNumber, email | _id, name, city, street, phoneNumber, judges, email | Court Manager |

### Document Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Document | /documents/ | POST | caseId, title, law, subject, requirement, honoringParty, file | _id, caseId, title, uploadedBy | Lawyer |
| Get Document | /documents/:id | GET | | _id, case, party, uploadedBy, title, fileName, law, subject, requirement, honoringParty | Lawyer, Judge , Court Manager |
| Get User Documents | /documents/user/:id | GET | | [ _id, case, party, uploadedBy, title, fileName, law, subject, requirement, honoringParty ] | Court Manager |
| Get Party Documents | /documents/party/:id | GET | | [ _id, case, party, uploadedBy, title, fileName, law, subject, requirement, honoringParty ] | Lawyer, Judge , Court Manager |
| Get Case Documents | /documents/case/:id | GET | | [ _id, case, party, uploadedBy, title, fileName, law, subject, requirement, honoringParty ] | Lawyer, Judge , Court Manager |
| Update Document Title | /documents/ | PATCH | id, title | _id, case, party, uploadedBy, title, fileName, law, subject, requirement, honoringParty | Lawyer, Court Manager |
| Download Document File | /documents/download/:documentId | GET | | Doucment File | Lawyer, Judge , Court Manager |

### Event Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Event | /events/ | POST | caseId, eventType, date, description | _id, case, type, date, description, location | Court Manager |
| Get Case Events | /events/case/:caseId | GET | | [ _id, case, type, date, description, location ] | Lawyer, Judge , Court Manager |
| Get Event | /events/:id | GET | | _id, case, type, date, description, location | Lawyer, Judge , Court Manager |
| Get User Up-coming events | /events/upcoming | GET | | [ _id, case, type, date, description, location ] | Lawyer, Judge
| Update Event | /events/ | PATCH | eventId, date, description | _id, case, type, date, description, location | Court Manager |
| Delete Event | /events/ | DELETE | eventId | | Court Manager |

### Party Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Party | /parties/ | POST | lawyer, caseId, client: (idNumber, firstName, lastName, email, phone, city, street) [ stakeholderType, idNumber, firstName, lastName, email, phone, city, street ] | _id, name, lawyer, stakeholders, case, client | Court Manager |
| Get Case Parties | /parties/case/:id | GET | | [ _id, name, lawyer, stakeholders, case, client ] | Lawyer, Judge , Court Manager |
| Get Party | /parties/:id | GET | | _id, name, lawyer, stakeholders, case, client | Lawyer, Judge , Court Manager |
| Update Party | /parties/ | PATCH | partyId, partyName, lawyer | _id, name, lawyer, stakeholders, case, client | Court Manager |
| Delete Party | /parties/ | DELETE | partyId | | Court Manager |

### Stakeholder Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Create Stakeholder | /stakeholders/ | POST | stakeholderType, partyId, idNumber, firstName, lastName, email, phone, city, street | _id, type, party, idNumber, firstName, lastName, email, phoneNumber | Court Manager |
| Get Stakeholders By Party | /stakeholders/party/:id | GET |  | [ _id, type, party, idNumber, firstName, lastName, email, phoneNumber ] | Lawyer, Judge , Court Manager |
| Get Stakeholders | /stakeholders/:id | GET |  | _id, type, party, idNumber, firstName, lastName, email, phoneNumber | Lawyer, Judge , Court Manager |
| Update Stakeholder | /stakeholders/ | PUT | _id, type, party, idNumber, firstName, lastName, email, phoneNumber | _id, type, party, idNumber, firstName, lastName, email, phoneNumber | Court Manager |
| Delete Stakeholder | /stakeholder/ | DELETE | stakeholderId | | Court Manager |

### User Routes
| Title | Route | Type | Request | Response | Access |
|-------|-------|------|---------|----------|--------|
| Get Judges | /users/judges | GET | | [ _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents ] | Lawyer, Judge, Court Manager
| Get Lawyers | /users/lawyers | GET | | [ _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents ] | Lawyer, Judge, Court Manager
| Get All Users | /users/ | GET | | [ _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents ] | Admin
| Update User(Admin) | /users/ | PUT | IDcard, firstName, lastName, userType, email, mobile, city, street | _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents | Admin
| Update User | /users/ | PATCH | firstName, lastName, email, mobile, city, street | _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents | Lawyer, Judge , Court Manager |
| Reset User Password | /users/password/ | PATCH | oldPassword, password, passwordConfirm | _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents | Lawyer, Judge , Court Manager
| Get Logged in user data | /users/user/ | GET | | _id, idNumber, firstName, lastName, userType, email, phoneNumber, city, street, licenseNumber, documents | Lawyer, Judge , Court Manager |

### Type Routes
| Title | Route | Type | Request | Response |
|-------|-------|------|---------|----------|
| Get User Types | /types/user-types/ | GET | | [ userType ] |
| Get Case Status Types | /case-status-types/ | GET | | [ caseStatusType ] |
| Get Event Types | /event-types/ | GET | | [ eventType ] |
