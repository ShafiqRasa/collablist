## Solution
We have an editable list that users collaborate on concurrently. Each item in the list should have a unique ID, as I suggest storing data in an array of objects, rather than an array of string. In this way we can not only apply CRUD functionality, but also block the input box while focusing to the other concurrent users to avoid overwriting. 

## A Quick Demo, to illustrate what was happening under the hood when two user use the list concurrently!
![step1](https://github.com/ShafiqRasa/collablist/assets/60951852/f0f8f59d-ffa6-47c7-bf2a-2bf4065ebbd8)
![step2](https://github.com/ShafiqRasa/collablist/assets/60951852/defed047-d97a-44f1-86c4-7badd14d293d)
![step3](https://github.com/ShafiqRasa/collablist/assets/60951852/f62aa654-0364-41be-9138-4f39a49c7c51)
