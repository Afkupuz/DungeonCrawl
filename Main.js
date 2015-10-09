

var userStats = new Array(4)
var userName = 'Hero';
var userClass = 'warrior';
var userHero;
var gameLevel = 1;
var moveCount = 0;
Monster.prototype = new Character(this.name, this.str, this.agi, this.int, this.hpMax, this.itemLevel)

//---------------------------//

function Map(width, height){
    this.mapX = width;
    this.mapY = height;
    
    this.mapWorld = new CreateWorld(this.mapX, this.mapY);
    
    this.myMap = this.mapWorld.newMap();
    

    this.isValid = function(x, y){
        if (x > (this.mapX-1) || x < 0 || y < 0 || y > (this.mapY-1)){
            return false;
        }   
        else{
            return true;
        }
    };
 
    this.getLandType = function(x, y){
        if (this.isValid(x, y) == true){
            return this.mapWorld.landType(this.myMap[x][y]);
        }
        else{
            return "error";
        }
    };

}//sets map size checks valid lane and gets land type
function CreateWorld(width, height){
    this.mapX = width;
    this.mapY = height;
    
    
    this.newMap = function(){
        var world = new Array(this.mapX)
        for (var i = 0; i < this.mapX; i++){
            world[i] = new Array(this.mapY);
            for(var j = 0; j < this.mapY; j++){
            world[i][j] = Math.floor((Math.random() * 100) + 1);
            };
        };
        this.world = world;
        return world;
    }; //end newMap
    
    this.landType = function(x){
        if (x < 22){
            return 'mountain';
        }
        else if (x < 61) {
            return 'grass';
        }else if (x < 91) {
            return 'tree';
        }else if (x < 97) {
            return 'monster';
        }else {
            return 'treasure';
        };
    }; //end land type

};//creates the map and sets the land type in the array
function Hero(x, y, map){
    this.name = 'lancelot';
    this.hori = x;
    this.vert = y;
    this.myX = function(){
        return this.hori;
    };
    this.myY = function(){
        return this.vert;
    };
    this.heroMap = map;
    this.isOff = false;
    this.move = function(x,y){
        if (x > this.heroMap.isValid(x, y)){
        this.hori = x;
        this.vert = y;
        }
        else {
        this.hori = this.hori;
        this.vert = this.vert;
        }
    };//positioning
    this.moveN = function(){
        var newY = this.vert - 1;
        if (this.heroMap.isValid(this.hori, newY) == false){
            this.vert = this.vert+(map.mapY-1);
            this.isOff = true;
        }
        else{
            this.vert = newY
        };
    };//move north
    this.moveS = function(){
        var newY = this.vert + 1;
        if (this.heroMap.isValid(this.hori, newY) == false){
            this.vert = this.vert-(map.mapY-1);
            this.isOff = true;
        }
        else {
            this.vert = newY
        };
    };//more south
    this.moveE = function(){
        var newX = this.hori + 1;
        if (this.heroMap.isValid(newX, this.vert) == false){
            this.hori = this.hori-(map.mapX-1);
            this.isOff = true;
        }
        else {
            this.hori = newX
        };
    };//move right, east
    this.moveW = function(){
        var newX = this.hori - 1;
        if (this.heroMap.isValid(newX, this.vert) == false){
            this.hori = this.hori+(map.mapX-1);
            this.isOff = true;
        }
        else {
            this.hori = newX
        };
    };//move left,west
    
};//provides movement for the hero
function HeroDisplay(map, hero){
    
    this.displayMap = map;
    this.hero = hero;
    this.heroTokenX = 0;
    this.heroTokenY = 0;
    
    this.heroUpdate = function(){
        var x = this.hero.myX();
        var y = this.hero.myY();
        
        if (x != this.heroTokenX || y != this.heroTokenY){
            this.coo = x+","+y;
            this.cell = document.getElementById(this.coo)
            this.cell.classList.remove('hero')
            this.heroTokenX = x;
            this.heroTokenY = y;
            this.coo = x+","+y;
            this.cell = document.getElementById(this.coo)
            this.cell.classList.add('hero') 
        }
    }
    
    this.heroTrackerA = function(x, y){
        this.coo = x+","+y;
        //get location by array value
        this.cell = document.getElementById(this.coo)
        this.cell.classList.add('hero')
    };//add hero class
    this.heroTrackerB = function(x, y){
        this.coo = x+","+y;
        this.cell = document.getElementById(this.coo)
        this.cell.classList.remove('hero')
    };//remove hero class
    
    
    this.origin = function(){
        this.heroTrackerA(this.hero.vert, this.hero.hori);
    };
    
    this.removeDisplay = function(){
        $("table").remove()
    };
    //dispHi, dispWid
    this.createDisplay = function(){
        this.body = document.getElementById('field');
        this.theWorld = document.createElement('table');
        this.theWorld.setAttribute('width', '100%');
        this.theWorld.setAttribute('height', '100%');
        this.theWorld.setAttribute('border', '1');
        this.theWorld.setAttribute('id', 'world');
        this.theWorld.setAttribute('table-layout', 'fixed');
        //this.worldWidth = this.theWorld.getAttribute('width');
       // this.theWorld.setAttribute('height', (this.worldWidth+"px"));
       
        for (var x = 0; x < this.displayMap.mapX; x++) {
            this.row = document.createElement('tr');
            for (var y = 0; y < this.displayMap.mapY; y++) {
                this.coordinates = x+","+y;
                this.classSet = this.displayMap.getLandType(x, y);
                this.cell = document.createElement('td');
                this.cell.setAttribute('class', this.classSet)
                this.cell.setAttribute('id', this.coordinates)
                //this.cell.appendChild(document.createTextNode(this.classSet +" "+ this.coordinates))
                this.row.appendChild(this.cell)
            }
            this.theWorld.appendChild(this.row);
        }
        this.body.appendChild(this.theWorld)
};//end map display creator
    
    this.refreshDisplay = function(){
        
        for (var x = 0; x < this.displayMap.mapX; x++) {
            //this.row = document.createElement('tr');
            for (var y = 0; y < this.displayMap.mapY; y++) {
                this.coordinates = x+","+y;
                this.change = document.getElementById(this.coordinates)
                this.classSet = this.displayMap.getLandType(x, y);
                //this.cell = document.createElement('td');
                this.change.setAttribute('class', this.classSet)
                //this.cell.setAttribute('id', this.coordinates)
                //this.cell.appendChild(document.createTextNode(this.classSet +" "+ this.coordinates))
                //this.row.appendChild(this.cell)
            }
            //this.theWorld.appendChild(this.row);
        }
        //this.body.appendChild(this.theWorld)
        
    };
    
    
}//displays hero data and map data
function HeroController(width, height){
    
    this.teleport = false;
    this.map = new Map(width,height);
    this.hero = new Hero(0,0,this.map);
    this.disp = new HeroDisplay(this.map, this.hero);
    
    this.canTele = function(){
        if(this.teleport == false){
            this.teleport = true
        }else if(this.teleport == true){
            this.teleport = false;
        }
        
    }
    
    this.nextMap = function(){
        this.map = new Map(width,height);
        this.disp = new HeroDisplay(this.map);
        gameLevel +=1;
    };
    
    this.nextMapTest = function(test){
           if (test == true){
                this.hero.isOff = false;
                this.nextMap();
                this.disp.refreshDisplay();
                this.disp.heroTrackerA((this.hero.vert), (this.hero.hori))
                //var stuff = document.getElementById('stuff');
                //stuff.appendChild(document.createTextNode(this.hero.vert));
            };
    };
    
    this.action = function(cell, user){
       moveCount += 1;
       if(this.teleport == true){
        this.teleport = false;
    }
       
     if (cell === 'grass') {
         //this.terrain = document.getElementById('stuff');
         //this.terrain.appendChild(document.createTextNode("grass"));
     } else if (cell === 'tree') {
         //this.terrain = document.getElementById('stuff');
         //this.terrain.appendChild(document.createTextNode("tree"));
         if (userHero.spellBook.length < 2){
         if(Math.random()*100 > 99){
         var spell = Math.random()*100 > 50 ? new MountainWalk():new Heal();
         if(userHero.spellBook.length == 0){
             userHero.addSpell(spell);
             output('you found a spell')
         };
         
         if (userHero.spellBook[0].name != spell.name){
             userHero.addSpell(spell);
             output('you found a spell')
         };
         
         };
     }
     } else if (cell === 'treasure') {
         this.map.mapWorld.world[this.hero.vert][this.hero.hori] = 50
         var weapon = new Weapon(gameLevel);
         var armor = new Armor(gameLevel);
         var item = Math.random()*100 > 50 ? weapon:armor;
         userHero.addItem(item);
         //this.terrain = document.getElementById('stuff');
         //this.terrain.appendChild(document.createTextNode("treasure"));
         userHero.hpMax += Math.floor(Math.random()*(50+gameLevel*10));
         userHero.displayStatus();
         $("#messageArea").fadeOut(function() {
  $(this).text('You have found treasure and take a rest. You heal to '+userHero.hpMax).fadeIn();
});
         //output('You have found treasure and take a rest. You heal to '+userHero.hpMax)
     } else if (cell === 'monster') {
         this.map.mapWorld.world[this.hero.vert][this.hero.hori] = 50
        // this.terrain = document.getElementById('stuff');
        // this.terrain.appendChild(document.createTextNode("monster"));
         $('#field').hide(1000);
         $('#monster').show(1000);
        monster = new Monster(gameLevel,gameLevel+1)
        $("#messageArea").fadeOut(function() {
  $(this).text('A '+monster.name+' jumps out of the bushes brandishing its '+monster.weapon.name+'. It gives a roar of engagement and charges!').fadeIn();
});
        //output('A '+monster.name+' jumps out of the bushes brandishing its '+monster.weapon.name+'. It gives a roar of engagement and charges!');
     }
    }
    
    this.story = function(){
        switch(gameCount){
            case 0:
                output("Welcome to the world hero. There is wealth and glory to be had, but beware the monsters. Gold will give you a chance to rest, and perhaps provide something useful. Monsters will attack with abandon. Do not try to cross the mountains; they are tall and vast. Rumors speak of trees that will teach you... Go forth, find the castle, rescue the princess, and above all SLAY THE DRAGON")
                break;
                case 10:
                    
        }
    }
        
    this.heroMove = function(arrow){
        this.disp.heroTrackerB((this.hero.vert), (this.hero.hori))
        switch(arrow.which) {
            case 37: // left, west
            if (this.map.getLandType((this.hero.vert), (this.hero.hori-1)) == 'mountain' && this.teleport === false){
            }
            else{
            this.hero.moveW();
            };
            this.disp.heroTrackerA((this.hero.vert), (this.hero.hori))
            this.nextMapTest(this.hero.isOff);
            break;

            case 38: // up, north
            if (this.map.getLandType((this.hero.vert-1), (this.hero.hori)) == 'mountain' && this.teleport === false){
            }
            else{
            this.hero.moveN();
            };
            this.disp.heroTrackerA((this.hero.vert), (this.hero.hori))
            this.nextMapTest(this.hero.isOff);
            //this.action(this.map.getLandType(this.hero.vert, this.hero.hori));
            break;

            case 39: // right, east
            if (this.map.getLandType((this.hero.vert), (this.hero.hori+1)) == 'mountain' && this.teleport === false){
            }
            else{
            this.hero.moveE();
            };
            this.disp.heroTrackerA((this.hero.vert), (this.hero.hori))
            this.nextMapTest(this.hero.isOff);
            //this.action(this.map.getLandType(this.hero.vert, this.hero.hori));
            break;
    
            case 40: // down, south
            if (this.map.getLandType((this.hero.vert+1), (this.hero.hori)) == 'mountain' && this.teleport === false){
            }
            else{
            this.hero.moveS();
            };
            this.disp.heroTrackerA((this.hero.vert), (this.hero.hori))
            this.nextMapTest(this.hero.isOff);
            //this.action(this.map.getLandType(this.hero.vert, this.hero.hori));
            break;

            default: return; // exit this handler for other keys
        };
        this.action(this.map.getLandType(this.hero.vert, this.hero.hori), userHero);
        arrow.preventDefault(); // prevent the default action (scroll / move caret)
        //this.disp.removeDisplay();
        //this.disp.createDisplay();
        
    };//end hero move

}//provides control for hero movement and action events

//---------------------------//

var msgbox;
var otherbox;
function output(msg){
	if (!msgbox)
		msgbox=document.getElementById("messageArea");
	    //msgbox.scrollTop = msgbox.scrollHeight;
	    msgbox.innerHTML += msg + "<br\>";
	    //console.log(msg);
	    var textarea = document.getElementById('playpen');
	    textarea.scrollTop = textarea.scrollHeight;
	    
	    
	    /*
	    playbox = document.createElement('p');
        playbox.setAttribute('id', "playbox")
        playbox.appendChild(document.createTextNode(msg))
        //msgbox.textNode.fadeOut();
        msgbox.appendChild(playbox);
        $('#playbox').fadeOut(5000)
	    */
       
        //document.msgbox.appendChild('jh')
        
        
        //$('#messageArea').innerHTML.fadeOut(5000)
}
function out(msg1){
	if (!otherbox)
		otherbox=document.getElementById("stuff");
	    //msgbox.scrollTop = msgbox.scrollHeight;
	    otherbox.innerHTML += msg1 + "<br\>";
}

//---------------------------//


function Character(name, str, agi, int, hp, itemLevel){
  this.name = name;
  this.weapon = new Weapon(itemLevel);
  this.armor = new Armor(itemLevel);
  this.str = str
  this.agi = agi
  this.int = int
  this.hpMax = hp;
  this.level = 0;
  this.exp = 0;
  this.bag = [];
  this.spellBook = [];
  this.type = 'character';
  this.pic = '';
  this.damage = 0;
  
  this.crit = function(){  
    this.totalcrit = 5+this.level+(this.agi*0.1)+(this.int*0.05)
    return this.totalcrit
  }
  this.levelUp = function(){
      this.str += Math.floor((Math.random() * 3) + 3)
      this.agi += Math.floor((Math.random() * 3) + 3)
      this.int += Math.floor((Math.random() * 3) + 3)
      this.hp += Math.floor((Math.random() * 12) + 13)
      this.level += 1;
      this.displayLevelUp();
      this.displayStatus();
  }
  this.dealDamage = function(){
      output(this.name+' swings!')
      this.damage = Math.floor((Math.random() * this.weapon.attack) + this.level) + this.str;
      return Math.floor(this.damage);
  };
  this.specialDamage = function(){
      output(this.name+' swings hard!')
      this.damage = Math.floor((Math.random() * this.weapon.attack) + this.level) + this.str;
      return Math.floor(this.damage*1.5);
  };
  this.ultimateDamage = function(){
      output(this.name+' swings really hard.')
      this.damage = Math.floor((Math.random() * this.weapon.attack) + this.level) + this.str;
      return Math.floor(this.damage*2);
  };
  this.takeDamage = function(damage, attackerName, attackerWeapon){
    var def = Math.floor((this.armor.defense*0.6));
    this.hpMax -= (damage - def);
    if(this.hpMax <= 0){
        alert('You have died! <br\> --- GAME OVER ---')
    }else
    {
        output("The "+attackerName + " hits you with its "+attackerWeapon+" for "+damage+" damage ("+def+" absorbed by your armor)! You have "+this.hpMax+" health left!!");
    };
  };
  this.addItem = function(item){
      this.bag.push(item);
      this.displayBag();
  };
  this.equip = function(bagNum){
      item = this.bag[bagNum]
      var hold;
      
      if (item.type == 'weapon'){
          hold = this.weapon;
          this.weapon = item;
          this.bag.splice(bagNum,1, hold);
      }
      else if (item.type == 'armor'){
          hold = this.armor;
          this.armor = item;
          this.bag.splice(bagNum,1, hold);
      }
      else{
          return;
      };
      this.displayBag();
      this.displayStatus();
      this.displayEquipment();
  };
  this.removeItem = function(item){
      this.bag.splice(item, 1);
      this.displayBag()
  };
  this.passive = function(){
      
  };
  this.fight = function(attack, target){
      var damage = 0;
      switch(attack){
        case 'basic':
        case 1:
            damage = this.dealDamage();
            break;
        case 'special':
        case 2:
            damage = this.specialDamage();
            break;
        case 'ultimate':
        case 3:
            damage = this.ultimateDamage();
            break;
        default:
            damage = this.dealDamage();
      };
      target.takeDamage(damage, this.name, this.weapon.name)
              
  };
  this.displayBag = function(){
      var newTable = dynamicTable.config('inventory',
                                 ['field1', 'field2', 'field3'], 
                                 ['Item', 'Stats', 'Equip'],
                                 'Your bag is empty: ');
                                 
    var bagArray = [];
    var remove = 'userHero.removeItem(this.value)'
    var equip = 'userHero.equip(this.value)'
    
    $.each(this.bag, function(one, two) {
        var pic = two.type == 'weapon' ? '<img src="http://pre08.deviantart.net/5882/th/pre/i/2014/291/4/6/sci_fi_sword_7_by_ah_kai-d821rly.jpg" style="width:100px;height:50px">' : '<img src="http://pre00.deviantart.net/474d/th/pre/i/2012/030/6/a/plate_armor_by_4seasonswinter-d2xolfe.png" style="width:80px;height:60px">';
        var stat = two.type == 'weapon' ? "Attack: "+two.attack+"<br\>" : "Defense: "+two.defense+"<br\>"
        bagArray.push({
            field1: pic+"<br\>"+two.name, 
            field2: stat+"Strength: "+two.str+"<br\>"+"Agility: "+two.agi+"<br\>"+"Intelligence: "+two.int, 
            field3: 
            "<button value="+one+" onclick="+equip+">Equip</button>"+"<br\>"+
            "<button value="+one+" onclick="+remove+" >Remove</button>"})
    });
    
    newTable.load(bagArray)
    
  }
  this.displayEquipment = function(){
      var newTable = dynamicTable.config('equipment',
                                 ['field1', 'field2'], 
                                 ['Item', 'Stats'],
                                 'Your gear: ');
                                 
    var gear = [{
        field1: '<img src="http://pre08.deviantart.net/5882/th/pre/i/2014/291/4/6/sci_fi_sword_7_by_ah_kai-d821rly.jpg" style="width:100px;height:50px">'+'<br\>'+this.weapon.name,
        field2: "Attack: "+this.weapon.attack+"<br\>"+" Strength: "+this.weapon.str+"<br\>"+"Agility: "+this.weapon.agi+"<br\>"+"Intelligence: "+this.weapon.int
    }, {
        field1: '<img src="http://pre00.deviantart.net/474d/th/pre/i/2012/030/6/a/plate_armor_by_4seasonswinter-d2xolfe.png" style="width:80px;height:60px">'+'<br\>'+this.armor.name,
        field2: "Defense: "+this.armor.defense+"<br\>"+"Strength: "+this.armor.str+"<br\>"+"Agility: "+this.armor.agi+"<br\>"+"Intelligence: "+this.armor.int
    }];
    
    newTable.load(gear)
  }
  this.displayLevelUp = function(){
      var newTable = dynamicTable.config('levelUp',
                                 ['field1'], 
                                 ['Level Up Box'],
                                 'No exp yet...');
        var nextLevelArray = []
        for (var i = 0; i < 100; i++){
        nextLevelArray[i]=100*i+(i*20*this.level)+100;
    };
        var stuff = 'not enough';
        var levelButton = this.exp > nextLevelArray[this.level] ? 'userHero.levelUp()': 'output("Not_enough_experience")';
        
        var levelArray = [{
        field1: 'Current Exp: '+this.exp+' <br\> Next Level: '+nextLevelArray[this.level]+' <br\> '+ "<button onclick="+levelButton+">Level Up</button>"
    }];
    
    out(this.level)
    
    newTable.load(levelArray)
  }
  this.displaySpellBook = function(){
      var newTable = dynamicTable.config('spellbook',
                                 ['field1', 'field2', 'field3'], 
                                 ['Spell', 'Description', 'Cast'],
                                 'Your spell book is empty... ');
    
    var book = [];
    
    $.each(this.spellBook, function(one, two) {
        book.push({
            field1: two.pic+"<br\>"+two.name, 
            field2: two.desc, 
            field3: "<button value="+one+" onclick="+two.does+" >Cast</button>"})
    });
    
    newTable.load(book)
    
  }
  this.addSpell = function(spell){
      this.spellBook.push(spell)
      this.displaySpellBook();
  }
  this.displayStatus = function(){
      var newTable = dynamicTable.config('status',
                                 ['field1', 'field2', 'field3'], 
                                 ['Health', 'Stats', 'Details'],
                                 'Your spell book is empty... ');
    var primary = 0
    if (this.type == "Warrior"){
        primary = this.str + this.weapon.str + this.armor.str;
    }else if (this.type == "Rogue"){
        primary = this.agi + this.weapon.agi + this.armor.agi; 
    }else if (this.type =='Mage'){
        primary = this.int + this.weapon.int + this.armor.int;
    };
    
    var baseDam = this.level + primary;
    var maxDam = this.weapon.attack + this.level + primary;
    var str = this.str + this.weapon.str + this.armor.str;
    var agi = this.agi + this.weapon.agi + this.armor.agi;
    var int = this.int + this.weapon.int + this.armor.int;
    
    var stats = [{
        field1: userHero.hpMax,
        field2: "Damage: "+baseDam+"-"+maxDam+"<br\>"+" Strength: "+str+"<br\>"+"Agility: "+agi+"<br\>"+"Intelligence: "+int,
        field3: "Name: "+userHero.name +"<br\>Class: "+ userHero.type +"<br\>Level: "+ userHero.level
    
    }];
    
    newTable.load(stats)
    
  }
  
  
  
};//end character
function Warrior() {
    this.type = 'Warrior';
    this.pic = '<img src="https://www.ultimateeditionoz.com/forum/download/file.php?id=15404&mode=view" style="width:100%;height:100%;">';
    this.str = this.str+5;
    this.passive = function(){
        //on level up
        this.passiveName = 'Might';
        var str = this.str + this.weapon.str + this.armor.str;
        var might = this.level + (str*.1);
        return might;
    }
    this.levelUp = function(){
        this.level += 1;
      this.str += Math.floor((Math.random() * 6) + 6+this.passive())
      this.agi += Math.floor((Math.random() * 3) + 3)
      this.int += Math.floor((Math.random() * 3) + 3)
      this.hpMax += Math.floor((Math.random() * 12) + 13 + this.str + this.passive())
      this.displayLevelUp();
      this.displayStatus();
    };
    this.dealDamage = function(){
        var str = this.str + this.weapon.str + this.armor.str;
        //var rand =Math.floor((Math.random() * this.weapon.attack));
        this.damage = Math.floor((Math.random() * (this.weapon.attack)) + this.level) + str;
        var crit = Math.floor((Math.random() * 100))
        if (this.crit() >= crit ){
            output('Your '+this.weapon.name+' forces its way through a weak point in your opponents defense!');
            return Math.floor(this.damage*1.75);
        }
        output('You swing your '+this.weapon.name+'. A deft trick and youve bested its defense!');
      return Math.floor(this.damage);
    };
    this.specialDamage = function(){
       output("You grip your weapon with both hands and bow your head in concentration. Your next swing smashes through your target and splits the ground at it's feet!");
        var str = this.str + this.weapon.str + this.armor.str
        this.damage = Math.floor((Math.random() * this.weapon.attack+str) + this.level) + (str*1.5);
        var crit = Math.floor((Math.random() * 100))
        if (this.crit() >= crit ){
            this.damage *= 2
          output('Suddenly, fire explodes from the cracks! The moster BURNS...');
        }
      return Math.floor(this.damage);
    }
    this.ultimateDamage = function(){
        output("You give your opponent a nasty grin - 'Omnislash!' <br\> The monsters eyes widen, a look of fear... <br\> Time slows as you dash forward, cut, cut, cut. Each cut gets harder to perform as the time stream slows to a halt. One more slash and your target's time-line would be completely severed...")
        var str = this.str + this.weapon.str + this.armor.str
        this.damage = Math.floor((Math.random() * (this.weapon.attack*1.5)+(str*2)) + (this.level*2)) + (str*2.5);
        var crit = (Math.floor((Math.random() * 100))+25)
        if (this.crit() >= crit ){
            this.damage *= 4
            output('Your final strike sings out, and shards of their past fall around them.');
        }
        else{
          output('but you find that it is impossible to lift your weapon for that last hit.');
        };
      return Math.floor(this.damage);
    }
  
};//end war
function Rogue() {
    this.type = 'Rogue';
    this.pic = '<img src="http://www.allthatsepic.com/wp-content/uploads/2013/04/Thief-6.jpg" style="width:100%;height:100%;">';
    this.agi = this.agi+5;
    this.levelUp = function(){
        this.level += 1;
      this.str += Math.floor((Math.random() * 3) + 3)
      this.agi += Math.floor((Math.random() * 6) + 6)+this.level
      this.int += Math.floor((Math.random() * 3) + 3)
      this.hpMax += Math.floor((Math.random() * 12) + 13+this.str*0.75)
      this.displayLevelUp();
      this.displayStatus();
    };
    this.passive = function(){
        //on take damage and crit
        this.passiveName = 'Dodge / Crit boost';
        var agi = this.agi + this.weapon.agi + this.armor.agi;
        var dodge = this.level + (agi*.1);
        return dodge;
    }
    this.dealDamage = function(){
        var agi = this.agi + this.weapon.agi + this.armor.agi
        this.damage = Math.floor((Math.random() * this.weapon.attack) + this.level + agi);
        var crit = Math.floor((Math.random() * 100))
        if ((this.crit()+this.passive()) >= crit ){
            output('You swing your '+this.weapon.name+" repeatedy in a distracting manner, then suddenly whip out a main gosh and stab under your opponent's armor!");
            return Math.floor(this.damage*2);
        }else{
            output("Your opponent cannot hope to keep up with your seemingly wild attacks!");
            return Math.floor(this.damage);
        }
    };
    this.specialDamage = function(){
        output("You melt into the shadows and attack suddenly from behind!");
        var agi = this.agi + this.weapon.agi + this.armor.agi
        this.damage = Math.floor((Math.random() * (this.weapon.attack)+(agi)) + this.level) + (agi);
        var crit = Math.floor((Math.random() * 100))
        if ((this.crit()+this.passive()) >= crit ){
            this.damage *= 2.5;
            output('Your weapon finds a soft spot and sinks in with a satisfying squelch.');
        }
      return Math.floor(this.damage);
    }
    this.ultimateDamage = function(){
        output("You step back and disengage for the fight, then give a flourish of a bow - 'For those who are about to die'<br\> The shadows begin to lengthen and grow. They become more solid and wicked eyes appear along with sharp daggers. A tense moment passes...");
        var agi = this.agi + this.weapon.agi + this.armor.agi
        this.damage = Math.floor((Math.random() * (this.weapon.attack*1.5)+(agi*1.5)) + this.level) + (agi*1.5);
        var crit = (Math.floor((Math.random() * 100)))
        if ((this.crit()+this.passive()) >= crit ){
            this.damage *= 5;
            output('Something obsurese the light, fragmenting the shadows - multiplying them indeterminantly. You watch in near horror as they tear your enemy limb from limb');
        }
        else{
            output('Suddenly they all jump on your target. It dissapears under a veil of darkness...');
        };
      return Math.floor(this.damage);
    }
    this.takeDamage = function(damage, attackerName, attackerWeapon){
        var def = Math.floor((this.armor.defense*0.6));
        var rando = Math.floor((Math.random() * 100));
        if (this.passive() < rando){
            this.hpMax -= (damage - def);
            if(this.hpMax <= 0){
                alert('You have died! <br\> --- GAME OVER ---')
            }else{
                output("The "+attackerName + " hits you with its "+attackerWeapon+" for "+damage+" damage ("+def+" absorbed by your armor)! You have "+this.hpMax+" health left!!");
        };
        }else{
            output("The "+attackerWeapon+" comes crashing down, but you dance agilely away! The "+attackerName+" snarls in frustation...");
        };
        };
  
};//end rogue
function Mage() {
    this.type = 'Mage';
    this.pic = '<img src="http://api.ning.com/files/mL7vEimd6q1WfaGP6Q1yo2N0Y5e4-S-GTq6cG94N85u*7OuMzxuhVKlZQ2EpR7bzfTtnB0N1bC5obBqsaC*SnfJgCsPT8JHS/52063.jpg" style="width:100%;height:100%;">';
    this.int = this.int+5;
    this.passive = function(){
        //on damage and level
        this.passiveName = 'Magic';
        var int = this.int + this.weapon.int + this.armor.int;
        var magic = this.level + (int*.2);
        return magic;
    };
    this.levelUp = function(){
        this.level += 1;
      this.str += Math.floor((Math.random() * 3) + 3)
      this.agi += Math.floor((Math.random() * 3) + 3)
      this.int += Math.floor((Math.random() * 6) + 6 + this.passive())
      this.hpMax += Math.floor((Math.random() * 12) + 13 + this.str*0.5)
      this.displayLevelUp()
      this.displayStatus();
    };
    this.dealDamage = function(){
        var int = (this.int + this.weapon.int + this.armor.int)*(1+(this.passive()/100));
        this.damage = Math.floor((Math.random() * this.weapon.attack) + this.level) + (int);
        var crit = Math.floor((Math.random() * 100))
        if (this.crit() >= crit ){
            output('Suffer!');
            return Math.floor(this.damage*1.75);
        }else{
            output('Fireball!');
            return Math.floor(this.damage);
        }
        
    };
    this.specialDamage = function(){
        //output("A fireball swirls into existance between your hands. The flames snap and crackle as the air around it burns. It leaps forth and engulfs your enemy!");
        var int = (this.int + this.weapon.int + this.armor.int)*(1+(this.passive()/100));
        this.damage = Math.floor((Math.random() * this.weapon.attack+int) + this.level) + (int*1.5);
        var crit = Math.floor((Math.random() * 100))
        if (this.crit() >= crit ){
            this.damage *= 2.3
          //  output('The fireball exlodes on impact and the monster flies 10 feet in the air!');
        };
      return Math.floor(this.damage);
    };
    this.ultimateDamage = function(){
            output("You begin to glow with an etherial light. You stomp the ground and a red portal opens beneith you. You raise you hands to the sky as bright light blasts appart the clouds. Legions of angels and demons can be seen locked in their timeless battle...")
        var int = (this.int + this.weapon.int + this.armor.int)*(1+(this.passive()/100));
        this.damage = Math.floor((Math.random() * (this.weapon.attack*1.5)+(int*1.5)) + (this.level*2)) + (int*2);
        var crit = (Math.floor((Math.random() * 1))+40)
        if (this.crit() >= crit ){
            this.damage *= 3;
            output('The Archangel Gabriel above sees Lucifer below... They clash right on top of your target...');
        }
        else if ((this.crit()+25) >= crit){
            output('An angel cleaves its way through your opponent as it flies by on its way to some unknown destination.');
        this.damage *= 2;
        }else if ((this.crit()+55) >= crit){
            output('A massive demon stops to inflict malacious pain on your opponent. It laughs horribly as it wanders off in search of something else of interest.');
        this.damage *= 2;
        }else{
            output("The pull of these two powerful realms tears at your opponent's soul!")
        };
      return Math.floor(this.damage);
    };
  
};//end mage
function Monster(stats, level) {
    this.monsterLevel = 1 + stats;
    this.itemLevel = 1 + level;
    this.type = 'monster';
    this.weapon = new Weapon(this.itemLevel);
    this.armor = new Armor(this.itemLevel);
    this.firstName = new Array("Dire", "Disgusting", "Mutated", "Smelly", "Huge", "Spiked", "Silent", "Nasty");
    this.secondName = new Array(" Goblin", " Oger", " Worg", " Troll", " Hobgoblin", " Crook");
    this.first = Math.floor(Math.random()*8);
    this.second = Math.floor(Math.random()*6);
    this.exp = Math.floor((this.monsterLevel*10)*1.3);
    this.name = this.firstName[this.first]+this.secondName[this.second];
    this.str = 15+(this.monsterLevel*Math.floor((Math.random() * 7) + 2));
    this.agi = 15+(this.monsterLevel*Math.floor((Math.random() * 5) + 4));
    this.int = 15+(this.monsterLevel*Math.floor((Math.random() * 5) + 4));
    this.hpMax = 100+(this.monsterLevel*Math.floor((Math.random() * 12) + 13));
    this.totalHp = this.hpMax
    this.defense = this.monsterLevel + this.armor.defense
    
  switch (this.firstName[this.first]) {
    case "Dire":
          this.hpMax = Math.floor(this.hpMax*1.2);
          break;
    case "Disgusting":
          this.defense = Math.floor(this.defense*1.2);
          break;
    case "Mutated":
          this.str = Math.floor(this.str*1.2);
          break;
    case "Smelly":
          this.defense = Math.floor(this.defense*1.2);
          break;
    case "Huge":
          this.hpMax = Math.floor(this.hpMax*1.2);
          break;
    case "Spiked":
          this.str = Math.floor(this.str*1.2);
          break;
    case "Silent":
          this.itemLevel = Math.floor(this.itemLevel*1.2);
          break;
    case "Nasty":
          this.defense = Math.floor(this.defense*1.15);
          this.hpMax = Math.floor(this.hpMax*1.15);
          break;
    default:
    this.health += 1;
  }
  
  this.takeDamage = function(damage, attackerName, attackerWeapon){
        var state = 'healthy'
        if ((this.hpMax/this.totalHp) >= 0.6){
            state = 'still going strong!';
        }else if ((this.hpMax/this.totalHp) >= 0.2){
            state = 'weakened!';
        }else{
            state = 'near death!';
        };
        
        var def = Math.floor((this.armor.defense*0.2));
        
        var rando = Math.floor((Math.random() * 100));
        if (2 < rando){
            this.hpMax -= Math.floor((damage-def));
            if(this.hpMax <= 0){
               output(attackerName + " hits for "+damage+" damage! The "+this.name+" looks dead.");
            }else{
                output(attackerName + " hits for "+damage+" damage! The "+this.name+" looks like its "+state);
        };
        }else{
            output("Your attack comes crashing down, but the "+this.name+" jumps away! You growl in frustation...");
        };
        };
};//end monster

//---------------------------//

function CreateCharacter(userName, userClass, userStats){
    if (userClass == 'warrior'){
        Warrior.prototype = new Character(userName, userStats[0], userStats[1], userStats[2], userStats[3], 1)
        userHero = new Warrior();
    }else if (userClass == 'mage'){
        Mage.prototype = new Character(userName, userStats[0], userStats[1], userStats[2], userStats[3], 1)
        userHero = new Mage();
    }else if(userClass == 'rogue'){
        Rogue.prototype = new Character(userName, userStats[0], userStats[1], userStats[2], userStats[3], 1)
        userHero = new Rogue();
    }else{
        return
    }
    heropicdisplay
    
    $('#characterCreator').hide(1000);
    $('#heropicdisplay').html(userHero.pic)
    lance = new HeroController(6, 6)
    lance.disp.createDisplay();
    lance.disp.origin();
    userHero.displayBag();
    userHero.displayEquipment();
    userHero.displayLevelUp();
    userHero.displayStatus();
    userHero.displaySpellBook();
};
function displayStats(userName, userClass, userStats){
    
	document.getElementById('totalStats').innerHTML = 
	    "Name: "+userName+"<br\>"+
	    "Class: "+userClass+"<br\>"+
	    "Strength: "+userStats[0]+"<br\>"+
        "Agility: "+userStats[1]+"<br\>"+
        "Inteligence: "+userStats[2]+"<br\>"+
        "Health Points: "+userStats[3]+"<br\>"
};
function StatGen() {
        this.str = Math.floor((Math.random() * 17) + 3);
        this.agi = Math.floor((Math.random() * 17) + 3);
        this.int = Math.floor((Math.random() * 17) + 3);
        this.hpMax = 90+Math.floor((Math.random() * 17) + 3);
        this.stats = new Array(this.str, this.agi, this.int, this.hpMax);
    
        var place = document.getElementById('rollbox');
        place.innerHTML = "Strength: "+this.stats[0]+"<br\>"+
        "Increases overall health and a warrior's damage.<br\>"+
        "Agility: "+this.stats[1]+"<br\>"+
        "Increases overall critical strike chance and a rogue's damage.<br\>"+
        "Inteligence: "+this.stats[2]+"<br\>"+
        "Increases overall experience gained and a mage's damage.<br\>"+
        "Health Points: "+this.stats[3]+"<br\>"+
        "Determines the amount of punishment a hero can take.<br\>";
        userStats = this.stats;
}
function getName(){
	var name = document.getElementById('userInputName').value;
	document.getElementById('heroName').innerHTML = name;
	userName = name;
}
function SelectWarrior(){
    var description = "The Warrior is the symbol of strength and courage. Wade into battle with a roar! <br\> Passive: Extra Strength and Durrability"
	document.getElementById('classDescription').innerHTML = description;
	document.getElementById('classPicture').innerHTML = '<img src="https://www.ultimateeditionoz.com/forum/download/file.php?id=15404&mode=view" style="width:100%;height:70%;">';
	userClass = 'warrior';
}
function SelectMage(){
    var description = "Hang back and rain hell down on EVERYTHING. The Magi is the pillar of intellect! <br\> Passive: Intelligence boosts damage"
	document.getElementById('classDescription').innerHTML = description;
	document.getElementById('classPicture').innerHTML = '<img src="http://api.ning.com/files/mL7vEimd6q1WfaGP6Q1yo2N0Y5e4-S-GTq6cG94N85u*7OuMzxuhVKlZQ2EpR7bzfTtnB0N1bC5obBqsaC*SnfJgCsPT8JHS/52063.jpg" style="width:100%;height:70%;">';
	userClass = 'mage';
}
function SelectRogue(){
    var description = "Agility is the name of the game. This cunning free spirit will rob you blind and probably dead (though you may not realize it)! <br\> Passive: Extra large critical strikes and a chance to dodge."
	document.getElementById('classDescription').innerHTML = description;
	document.getElementById('classPicture').innerHTML = '<img src="http://www.allthatsepic.com/wp-content/uploads/2013/04/Thief-6.jpg" style="width:100%;height:70%;">';
	userClass = 'rogue';
}

//-----------------------------//
    
function Armor(level) {
    this.firstName = new Array("Atomic", "Lavish", "Shielding", "Frosty", "Taboo", "Nebulous", "Fragrant", "Ethereal");
    this.secondName = new Array(" Armor", " Robe", " Leather", " Wrap", " Mail", " Sheath");
    this.first = Math.floor(Math.random()*8);
    this.second = Math.floor(Math.random()*6);
    this.name = this.firstName[this.first] + this.secondName[this.second];
    this.defense = Math.round((level/3)+Math.floor(Math.random()*level));
    this.str = Math.floor(Math.random()*1+level);
    this.agi = Math.floor(Math.random()*1+level);
    this.int = Math.floor(Math.random()*1+level);
    this.type = "armor";
    this.toString = "Defense: "+this.Defense;
};
function Weapon(level) {
    this.level = level;
    this.firstName = new Array("Berserking", "Acidic", "Devilish", "Idiotic", "Nondescript", "Quaint", "Sordid", "Wrathful");
    this.secondName = new Array(" Sword", " Dagger", " Axe", " Lance", " Flail", " Staff");
    this.first = Math.floor(Math.random()*8);
    this.second = Math.floor(Math.random()*6);
    this.name = this.firstName[this.first] + this.secondName[this.second];
    this.attack = Math.round((10+level/3)+Math.floor(Math.random()*level));
    this.str = Math.floor(Math.random()*1+level);
    this.agi = Math.floor(Math.random()*1+level);
    this.int = Math.floor(Math.random()*1+level);
    this.type = "weapon";
    this.toString = "Attack: "+this.Attack;
}
function MountainWalk(){
    this.pic = '<img src="http://images7.alphacoders.com/557/557535.jpg" style="width:100px;height:50px">'
    this.name = "Mountain Walk"
    this.currentCount = moveCount
    this.walk = function(){
        var count = moveCount;
        if (count - this.currentCount > 10){
            lance.canTele();
        output("You can now traverse mountains")
        this.currentCount = count;
        }else{
            output("That can't be cast yet")
        };
    }
    this.does = "userHero.spellBook[this.value].walk()";
    this.desc = "Allows your hero to move across mountains!"
    this.check = 'out("works")'
}
function Heal(){
    this.pic = '<img src="http://vignette2.wikia.nocookie.net/wowwiki/images/8/89/Spell_holy_renew.png/revision/latest?cb=20060925125824" style="width:100px;height:50px">'
    this.name = "Healing Touch"
    this.currentCount = moveCount;
    this.heal = function(){
        var count = moveCount;
        var amount = Math.floor(Math.random()*100);
        if (count - this.currentCount > 10){
            userHero.hpMax += amount;
        output("You have recovered "+amount+" hp, you are now at "+userHero.hpMax)
        this.currentCount = count;
        userHero.displayStatus();
        }else{
            output("That can't be cast yet")
        };
    };
    this.does = "userHero.spellBook[this.value].heal()"
    this.desc = "Recovers a small amount of health"
}

//---------------------------//
//merge//
//---------------------------//

function Event(value, user){
    monsterAttack = Math.random()*100
    if (monsterAttack < 2){
        monster.fight(3,user);
    }else if (monsterAttack < 22){
        monster.fight(2,user);
    }else{
        monster.fight('basic',user);
    }
    user.fight(value,monster);
    
    if (monster.hpMax <= 0){
        wepOrArm = Math.random()*100
        if(wepOrArm > 50){
            item = monster.weapon.name;
            user.addItem(monster.weapon);
        }else{
            item = monster.armor.name;
            user.addItem(monster.armor);
        }
        $('#field').show(1000);
        $('#monster').hide(1000);
        output('You have defeated the '+monster.name+'. You earn '+monster.exp+' experience! You also pick up the monsters '+item+'!')
        user.exp += monster.exp;
        userHero.displayLevelUp();
    };
    userHero.displayStatus();
}
var dynamicTable = function() {
    
    var id, table, info, head, emptyDefault;
    
    function build(names, item) {
        var row = '<tr>';
        $.each(names, function(index, name) {
                var c = item ? item[name+''] : name;
                row += '<td>' + c + '</td>';
            });
        row += '<tr>';
        return row;
    }
    
    function setHeader() {
        head = (head == null || head.length < 1) ? info : head; 
        var addHeader = build(head);
        if (table.children('thead').length < 1) table.prepend('<thead></thead>');
        table.children('thead').html(addHeader);
    }
    
    function setDefault() {
        var colspan = head != null && head.length > 0 ? 
            'colspan="' + head.length + '"' : '';
        var content = '<tr class="empty"><td ' + colspan + ' style="text-align:center">' + emptyDefault + '</td></tr>';
        if (table.children('tbody').length > 0)
            table.children('tbody').html(content);
        else table.append('<tbody>' + content + '</tbody>');
    }
    
    function emptyTable() {
        var clear = table.children('tbody').children('tr');
        if (clear.length == 1 && clear.hasClass('empty')) table.children('tbody').empty();
    }
    
    return {
        config: function(tableId, fields, headers, defaultText) {
            id = tableId;
            table = $('#' + tableId);
            info = fields || null;
            head = headers || null;
            emptyDefault = defaultText || 'No items to list...';
            setHeader();
            setDefault();
            return this;
        },
        
        load: function(data, append) {
            if (table.length < 1) return;
            setHeader();
            emptyTable();
            if (data && data.length > 0) {
                var rows = '';
                $.each(data, function(index, item) {
                    rows += build(info, item);
                });
                var beforeReplace = append ? 'append' : 'html';
                table.children('tbody')[beforeReplace](rows);
            }
            else {
                setDefault();
            }
            return this;
        },
        
        clear: function() {
            setDefault();
            return this;
        }
    };
}();

//---------------------------//

function statTest(){
    
    out("Pass: "+userHero.passive())
    out("str: "+userHero.str)
    out("agi: "+userHero.agi)
    out("int: "+userHero.int)
    out("hp: "+userHero.hpMax)
    out("lvl: "+userHero.level)
    
}

function test1(user){
    var bagArray = [];
    this.user=user;
    var target = user.removeItem(this.value);
    $.each(user.bag, function(one, two) {
        var pic = two.type == 'weapon' ? '<img src="http://pre08.deviantart.net/5882/th/pre/i/2014/291/4/6/sci_fi_sword_7_by_ah_kai-d821rly.jpg" style="width:100px;height:50px">' : '<img src="http://pre00.deviantart.net/474d/th/pre/i/2012/030/6/a/plate_armor_by_4seasonswinter-d2xolfe.png" style="width:80px;height:60px">';
        var stat = two.type == 'weapon' ? "Attack: "+two.attack+"<br\>" : "Defense: "+two.defense+"<br\>"
        bagArray.push({
            field1: pic+"<br\>"+two.name,
            field2: stat+"Strength: "+two.str+"<br\>"+"Agility: "+two.agi+"<br\>"+"Intelligence: "+two.int,
            field3: "<button value="+one+" onclick='out(this.value)'>Equip</button>"+"<br\>"+
            "<button value="+one+" onclick="+target+">Remove</button>"})
    });
    return bagArray;
};

$(document).ready(function(e) {
  
    userStats[0] = 20;
    userStats[1] = 20;
    userStats[2] = 20;
    userStats[3] = 120;
    //CreateCharacter("Zaba", "rogue", userStats)
    
    
    //userHero.addSpell(new MountainWalk())
    //userHero.addSpell(new Heal())
    
    /*
    Monster.prototype = new Character(this.name, this.str, this.agi, this.int, this.hpMax, this.itemLevel);
    var mon = new Monster(5 , 5);
    out(mon.name)
    out(mon.hpMax)
    out(gameLevel)
    */
    /*
    var lance = new Character('Lance', 5, 5, 5, 111, 5);
    Monster.prototype = new Character(this.name, this.str, this.agi, this.int, this.hpMax, this.itemLevel);
    Warrior.prototype = lance
    Rogue.prototype = lance
    Mage.prototype = lance
    var monster = new Monster(1,1);
    var war = new Warrior();
    var rogue = new Rogue();
    var mage = new Mage();
    var sword = new Weapon(5);
    var plate = new Armor(2);
    var stuff = document.getElementById('stuff');
    var other = document.getElementById('other');
    var foo = document.getElementById('foo');
    */
    //monster.fight(1, rogue);
    //war.fight(1,monster);war.fight(2,monster);war.fight(3,monster);
    //mage.fight(1,monster);mage.fight(2,monster);mage.fight(3,monster);
    //mage.fight(2,monster);
    //monster.fight(2,war);
    //monster.fight(1,rogue);
    //output(plate.defense)
    //output(rogue.dealDamage())
 
 /*   
    stuff.appendChild(document.createTextNode(mage.dealDamage()+'m, '+war.dealDamage()+'w, r'+rogue.dealDamage()));
    other.appendChild(document.createTextNode(mage.specialDamage()+', '+war.specialDamage()+', '+rogue.specialDamage()));
    foo.appendChild(document.createTextNode(mage.ultimateDamage()+', '+war.ultimateDamage()+', '+rogue.ultimateDamage()));
    
    */
    /*
    var lance = new HeroController(6, 6)
    lance.disp.createDisplay();
    lance.disp.origin();
*/


$(document).keydown(function(e) {
    if ($("#field").is(":visible")){
        lance.heroMove(e)
    }
});
    
});
    





















