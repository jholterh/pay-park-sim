FEEDBACK



CUSTOMER FEEDBACK

* Some customers appreciate the modern system but report that it is too slow.
* Others mention that the system did not work in the past, leading to long queues.
* Some (angry) customers want the old system back because it was easier.
* Others are perfectly fine with the new system.
* There is confusion about why the system does not accept bills, especially since the prices are quite high for coins.
* Complaints about prices at the bottom parking lot: “my friend had to pay 16 Euros.”
* The proposal mechanism is impressive to many: “it’s like magic.”
* People still remember that one Sunday with a 100-meter queue in the rain, waiting for two hours—with Italian people.


GENERAL OBSERVATIONS

* The system rarely crashes. Most issues occur because the customer at the front does not understand how it works (often older customers).
* The system could be made faster with small improvements that eliminate confusion or skip unnecessary steps.
* Some improvements may seem minor, but at scale (especially with slower customers), the impact is significant.
* When a customer taps something that is not interactive, it wastes a lot of time. The customer waits for a response, gets confused, and eventually realizes that nothing is going to happen.


BUGS (HIGH PRIORITY)

* Sometimes, for Italian license plates, the proposal includes two “-” characters. When this happens, you cannot continue, as the system does not accept Italian license plates with two dashes. If you remove the second dash, the system finds the plate.
* The cursor is implemented but non-functional. Worse, it confuses customers. When they realize they made a typo, they move the cursor to the error and try to insert a character, but the character always appears at the end.
* Overnight stays are problematic. For example, a customer who stayed overnight bought a day ticket (valid until 11pm) and wanted to pay for the remaining time the next day. When he tried to pay for “1 day and some hours,” the system said he had already paid. I tried it later, entering just the hours, but the system could not find the license plate anymore.


TIME IMPROVEMENTS

License Plate Input Page:
* Customers need to know the first step is to check if the country is set correctly. This is the most common mistake.
    * The system still finds the plate and proposes it, but the customer cannot press continue. This leads to frustration and long lines.
    * When the customer realizes the mistake and changes the country, the previously typed plate is deleted—leading to more anger.
* Suggestion: Add “1.” above the country input and “2.” above the license plate input.
* The proposal feature is great but should be more visible, so customers notice it sooner.
* Consider a navigation-system approach: if there are only a few options, go straight to a selection screen.
* Many customers type two letters at a time, check their phones, and only see the proposal after the sixth letter. A feedback sound could alert them when the proposal appears if possible.
* When the proposal pops up, customers check it carefully, tap it, and expect something to happen. It then takes time before they press continue. This suggests that pressing continue could be skipped, and the process could go directly to the “check license plate” page.
* The keyboard layout should match the language. For German, it currently uses the American keyboard (“WhErE iS tHe Z”).
* The input field should be selected by default. Customers sometimes think they need to tap it to type.
* The warning about what form the input needs to have is confusing because mostly unnecessary, maybe in orange it would be better.

Manual Time Input Page:
* The current setup is not intuitive and leads to mistakes. One customer almost paid over 40 Euros and was angry (“ItS a ScAm!?1”). The mistake: she entered “one day and some hours” instead of just the hours.
* The design is confusing for some. Some customers think they can only add one hour and one 15-minute increment, not realizing they can press the button multiple times.
* Observation: Most customers first recall when they arrived, then count the hours (subtracting 30–60 minutes for a “discount”).
* Suggestion: Ask for arrival time and calculate hours in the background.

Pay with Card Page:
* The page is designed like others, requiring a decision. Customers think they must tap either “insert card” or “contactless payment.”
* Suggestion: Add a small animation showing how to hold the card at the correct spot. Contactless is much faster than inserting the card (which always requires a PIN). This small nudge could save time. The large metal slot is enough for older customers to understand they can insert the card the old-fashioned way.
* Many creative attempts to pay contactless—most commonly, customers hold the card against the screen symbol, but they also try random spots on the machine. Instead of the current image, an animation would be more helpful.

Thank You Page:
* Many customers do not tap “exit” at the end, so it takes time to proceed automatically.
* When a new customer arrives, the first thing they do is read the page. If they do not understand the language, they change it—only to realize the information was unnecessary.
* To make it worse, the system resets to German on the start page, so they have to change the language again. This causes annoyance.
* Suggestion: Make the exit button more visible and display it in English, German, and Italian, so customers do not need to change the language just for this button.


QUESTIONS FROM CUSTOMERS (BY FREQUENCY)

* I was looking for a spot and didn’t find one—do I still have to pay? (Maybe add a sign at the exit; mostly an issue for the bottom lot.)
* Are motorcycles free?
* When do I check out with Easy-Pay, and can I just leave or do I have to do something?


PAY WITH QR CODE

* Placement is good; people in the back of the queue can see it easily.
* More customers would use it if they knew in advance which payment methods are accepted (Visa, Apple Pay, etc.).
* Many customers stop when asked to enter an email address. If it is necessary, explain why.


PROBLEMS WITH THE PARKING LOT

* Trash bins are overflowing.
* Trees are very dry; a large branch fell—luckily, not on a car.


CONCLUSION

* There are different personas using the system. Young people generally have no problem. Elderly people, some of whom do not even have a phone, struggle.
* The system should be designed with them in mind to prevent confusion.
* With elderly customers, everything takes four times as long. Efficiency is not optional—it is essential.
