Hey this is some content above the code
<?php
$name = 'LaDonne'; //need to start every variable w/ a dollar sign
$fullName = $name . 'Pallanck'; //use period for string concatination

class Person {
    protected $name;
    
    public function _construct($n) {
        $this->name = $n;//Assigning the passes parameter to a local variable in the class
    }
    
    public function getName() {
        return $this->name;//if you want to refer to the local variable you have to use $this->
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function\n";//double quotes interpret code w/i the string
}

echo "Hello {$name}s\n"; //to add an s
foo(NULL);
?>
And this is some content below
