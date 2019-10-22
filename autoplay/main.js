window.onload = function() {

var canvas = document.getElementById('canvas'),
          c = canvas.getContext('2d'),
          mouse = utils.captureMouse(canvas),
          log = document.getElementById('text'),
          gScore = document.getElementById('score'),
          pause = document.querySelector('#pause');
          segments = [],
          numSegments = 4,
          ball = new Ball(5, Math.random()*255 * 0xffffff),
          mslider = new mSlider(Math.random()*40 +60,5, Math.random()*255 * 0xffffff),
          bricks = [],
          numBricks = 5000,
          gravity = 0.1,
          bounce = -0.8,
          spring = 0.03,
          score = 0;

          ball.y = canvas.height /2;
          ball.vx = Math.random() *20;
         
 
         mslider.y = canvas.height - 100;



         /* ------------ draw bricks -----------*/ 
         for(var brick, j = 0, k = 0, l=0, i = 0; i<numBricks; i+=55) {
          brick = new Bricks(20, 15, Math.random()*255 * 0xffffff, .5);
          brick.y = 0;
          brick.x = i;
          if(i >= canvas.width) {
            brick.y = 20;
            brick.x = j;
            j += 30;

            if (j >= canvas.width+25) {
            brick.y = 40;
            brick.x = k;
            k += 30;
            
            if (k >= canvas.width+25) {
            brick.y = 60;
            brick.x = l;
            l += 30;
          }
        }
          } 
          bricks.push(brick);
         
        } 

        /* ------------ draw segments -----------*/ 
      while (numSegments--) {
        segments.push(new Segment(20, Math.random()*3+3, Math.random()*255 * 0xffffff));
      }


      // bounce ball boundries

      function moveBall() {
        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx *= bounce;
        } else if (ball.x - ball.radius < 0) {
           ball.x = ball.radius;
           ball.vx *= bounce;
        }
        if (ball.y + ball.radius > canvas.height) {
          //ball.y = canvas.height - ball.radius;
          //ball.vy *= bounce;
          
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= bounce;
          
        }
      
      }

      
      segments[segments.length -1].x = canvas.width /2;
      segments[segments.length -1].y = canvas.height/2;


      function reach (segment, xpos, ypos) {

      var dx = xpos - segment.x,
          dy = ypos - segment.y;

       segment.rotation = Math.atan2(dy, dx);

       var w = segment.getPin().x - segment.x,
           h = segment.getPin().y - segment.y; 

       return {
        x: xpos - w,
        y: ypos - h
       } ;   

      }

      function position (segmentA, segmentB)  {
        segmentA.x = segmentB.getPin().x;
        segmentA.y = segmentB.getPin().y;
      }  

      // ball hit by segments
      function checkHit() {
        var segment = segments[0],
            dx = segment.getPin().x - ball.x,
            dy = segment.getPin().y - ball.y,
            dist = Math.sqrt(dx * dx + dy * dy);

         if(dist < ball.radius)  {
          ball.vx += Math.random() * 2 - 1;
          ball.vy -= 1;

         }
         
       }

       function check() {
        if (mslider !== ball && utils.intersects(mslider, ball))    {
          //ball.y = (mSlider.y) + ball.radius;
          ball.vy *= bounce;
          ball.vx += Math.sin(mslider.x-mouse.x) *0.2;
        } 

        //  if (mslider.x + mslider.width > canvas.width) {
        //   mslider.x = canvas.width - mslider.width;
          
        // } else if (mslider.x - mslider.width < 0) {
        //    mslider.x = mslider.height;
           
        // }
       } 


      function move (segment, i) {
        if (i !==0) {
          target = reach(segment, target.x, target.y);
          position(segments[i-1], segment);
        }
      }

      function brickhit (brick) {
        var dx = brick.x - ball.x,
            dy = brick.y - ball.y,
            dist = Math.sqrt(dx * dx + dy * dy),
            min_distW = ball.radius + brick.width,
            min_dist = ball.radius + brick.height;
            
        if (dist < min_dist) {
            brick.alpha = 0;
            brick.x = 0;
            brick.y = 0;
            ball.vy *= bounce;
            score +=1;
            gScore.value = "score :" +score;  
           }
     
      brick.draw(c);
      }
      
      
      function draw (segment) {
        segment.draw(c);
      }

      function drawBrick (bricks) {
        bricks.draw(c);
      }
      
      var count = 0,
          count1 = true;
          log.value = "2";

      var kx = 0.8 * 0.2;   

      window.addEventListener('mousemove' , function() {
        var mx = (mouse.x - mslider.x) * 0.1;
        mslider.x += mx;
        }, false);

      (function drawFrame () {
        
        window.requestAnimationFrame(drawFrame, canvas);
        if(pause.value === 'play') {
        c.clearRect(0, 0, canvas.width, canvas.height);
        
        ballCount();
        moveBall();
        target = reach(segments[0], ball.x, ball.y);
        segments.forEach(move);
        segments.forEach(draw);
        bricks.forEach(brickhit);
      
        checkHit();
        check();
       
        ball.draw(c);
        mslider.draw(c);
        }
       }());
        
        function ballCount() {
           if (count == -1)  {
           document.getElementById("gOver").style.display = "block";
           document.getElementById("myScore").innerHTML =  "your score : " +score;
          } 

          if (count1) {
          if(ball.y > canvas.height) {
          ball = new Ball(5, Math.random()*255 * 0xffffff);
          ball.y = canvas.height /2;
          ball.vx = Math.random()*10 + 5;
          log.value = 1 - count;
          if(log.value == -1) {
            log.value = 0;
          }
          count ++;
          if(count === 3) {
            count1 = false;
            count =-1;
            ball.y = canvas.width;
             }
          }
          
        }
        }
};
