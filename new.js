var correctAnswers = 0;
var wrongAnswers = 0;
var randoms = [];
var correct = 0;
var wrong = 0;
var count = 0;
var operators=[];
var operator=0;
var numberOfQuestions1=parseInt(document.getElementById('numberOfQuestions').value);
var from=parseInt(document.getElementById('rangeFrom').value);
var to=parseInt(document.getElementById('rangeTo').value);
var restart=document.getElementById('restartQuiz');
restart.style.display='none';
var next=document.getElementById('nextProblem');
next.style.display='inline';
function generateRandomNumbers()
{   
	let num_1=0;
	let num_2=0;
	if(from>0)
	{
	    num_1 = Math.floor(Math.random() * (to-from))+from;
	    num_2 = Math.floor(Math.random() * (to-from))+from;
	}
	else{
		num_1 = Math.floor(Math.random() * (to-from+1))+from;
	    num_2 = Math.floor(Math.random() * (to-from+1))+from;
		
	}
	// set on DOM
	document.getElementById('num1').textContent = num_1;
	document.getElementById('num2').textContent = num_2;

	return [num_1,num_2];
}


function checkAnswer(){
	
	var answer = parseInt(document.getElementById('userAnswer').value);
	console.log(operator);
    if(operator=='+')
	{
	   console.log(randoms[0]+randoms[1]);
	   if((randoms[0]+randoms[1]) == answer)
	   {
		correct++;
		document.getElementById('correct').textContent = correct;
		document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
	   }
	   else
	   {
		wrong++;
		document.getElementById('wrong').textContent = wrong;
		document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
	   }
    }
	if(operator=='-')
	{
		console.log(randoms[0]-randoms[1]);
		if((randoms[0]-randoms[1]) == answer)
		{
			correct++;
			document.getElementById('correct').textContent = correct;
			document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
		}
		else
		{
			wrong++;
			document.getElementById('wrong').textContent = wrong;
			document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
		}
	}
	if(operator=='*')
	{
		    console.log(randoms[0]*randoms[1])
			if((randoms[0]*randoms[1]) == answer)
			{
				correct++;
				document.getElementById('correct').textContent = correct;
				document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
			}
			else
			{
				wrong++;
				document.getElementById('wrong').textContent = wrong;
				document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
			}
	
	}
	if(operator=='/')
	{
		    answer=parseFloat(document.getElementById('userAnswer').value).toFixed(5);
		    console.log(randoms[0]/randoms[1])
			const b=parseFloat(randoms[0]/randoms[1]).toFixed(5);
			if(Math.abs(b-answer)<0.000001)
			{
				correct++;
				document.getElementById('correct').textContent = correct;
				document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
			}
			else
			{
				wrong++;
				document.getElementById('wrong').textContent = wrong;
				document.getElementById('checkAnswer').removeEventListener('click', checkAnswer);
			}
	}
}

function callNextProblem()
{
	
	randoms = generateRandomNumbers();
	operator=generateRandomOperator();
	
	
	set_label(operator);
	
	document.getElementById('userAnswer').value = '';
	count++;
	

	document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

	if(count >=document.getElementById('numberOfQuestions').value)
	{
		
		restart.style.display='inline';
        next.style.display='none';
		document.getElementById('nextProblem').removeEventListener('click', callNextProblem)
	} 
}
function set_label(operator)
{
	const label=document.querySelector("#operators");
	label.textContent=''+ operator;
}
function decide_operator()
{ 
	if(document.getElementById('add_operation').checked)
	{
			operators.push('+');
	}
	if(document.getElementById('sub_operation').checked)
	{
			operators.push('-');
	}
	if(document.getElementById('mul_operation').checked)
	{
		operators.push('*');
	}
	if(document.getElementById('div_operation').checked)
	{
		operators.push('/');
	}

}

function generateRandomOperator() {
	const randomIndex = Math.ceil(Math.random() * operators.length)-1;
	return operators[randomIndex];
  }
  function validateSettings() {
    if (isNaN(from) || isNaN(to) || isNaN(numberOfQuestions1)) {
		console.log(from,to,numberOfQuestions1);
        alert('Please enter valid numbers for range and question count.');
        return false;
    }
    if (from > to) {
        alert('Range "from" should be less than or equal to "to".');
        return false;
    }
    if (numberOfQuestions1 <= 0) {
        alert('Number of questions should be greater than 0.');
        return false;
    }
	if (operators.length == 0) {
        alert('Please select at least one operation.');
        return false;
	    
    }
    return true;

    
}
function restartQuiz() {
	// Reset all counters and UI elements
	correct = 0;
	wrong = 0;
	count = 0;
	document.getElementById('correct').textContent = '0';
	document.getElementById('wrong').textContent = '0';
	document.getElementById('userAnswer').value = '';
	document.getElementById('nextProblem').style.display = 'inline';
	document.getElementById('checkAnswer').style.display = 'inline';
	document.getElementById('restartQuiz').style.display = 'none';
	document.getElementById('startQuestions').disabled = false;

	// Show settings screen
	document.getElementById('settings').style.display = "block";
	document.getElementById('questionary').style.display = "none";
}
document.addEventListener("DOMContentLoaded", function() {
	correctAnswers = 0;
	wrongAnswers = 0;
	randoms = [];
	count=0;
	operators=[];
   
	
	document.getElementById('correct').textContent = '0';
	document.getElementById('wrong').textContent = '0';
    const myDiv2 = document.getElementById("settings");
    const myDiv = document.getElementById("questionary");
  
  // Initially hide the div
   myDiv2.style.display="block";
   myDiv.style.display = "none"; 
   
  // Add a click event listener to the button
  
   document.getElementById('startQuestions').addEventListener("click",() =>{
	// Show the div when the button is clicked
	decide_operator();
	numberOfQuestions1=parseInt(document.getElementById('numberOfQuestions').value);
    from=parseInt(document.getElementById('rangeFrom').value);
    to=parseInt(document.getElementById('rangeTo').value);
    if(validateSettings())
	{
	
	myDiv2.style.display="none";
	myDiv.style.display = "block";
	
	callNextProblem();
	
	document.getElementById('startQuestions').disabled=true;
	}

	})
    
	document.getElementById('nextProblem').addEventListener('click', callNextProblem);
    document.getElementById('restartQuiz').addEventListener('click', restartQuiz);
})

  
  
  
    
	
