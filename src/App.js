import "./styles.css";
import { useState, useRef, useEffect } from "react";
import Lyrics from "./Lyrics";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import FocusLock from "react-focus-lock";
import { StyledBurger } from "./components/Burger/Burger.styled";
import { StyledMenu } from "./components/Menu/Menu.styled";
import { useOnClickOutside } from "./hooks";

import SaintPak from "./songs/pakrap-1.mp3";
import PakTeaching from "./songs/pakrap-2.mp3";
import AsToldByPak from "./songs/pakrap-3.mp3";
import PakTruth from "./songs/pakrap-4.mp3";
import Seriesly from "./songs/pakrap-5.mp3";
import Pakking from "./songs/pakrap-6.mp3";
import PakPoetry from "./songs/pakrap-7.mp3";
import ShootingMyShot from "./songs/pakrap-8.mp3";
import RockingThePak from "./songs/pakrap-9.mp3";
import WhoThePak from "./songs/pakrap-10.mp3";
import PakGotSome from "./songs/pakrap-11.mp3";
import PakSnappin from "./songs/pakrap-12.mp3";
import PakView from "./songs/pakrap-13.mp3";

function App() {
  const [showSongList, setShowSongList] = useState(true);
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Saint Pak",
      lyrics:
        "Cut this shit like its onions,Cause I see the tears,hands together like that bitch gonna say your prayers,Whisper up inside her ear,it aint never seen no fear,baby girl I give no fucks,you could tell that I never care,she said she want it now,so I put it in her rear,she say that she like a real nigga,she tell it when I'm near,dope whether it stops,my niggas really down to pop,somebody call the fucking opps,my niggas come through like its cops,we going to come through with the chop,you won't think that its karate,my niggas is next door,you would think that we are party,that's a different type of bar,niggas know its really hard,my niggas drive you crazy but I think that we don't got no cars,that shit mustang?,nah that shit like a honda,this is like stevie,you blind if you wonder,wonder(wanda) like you cosmos,ain't no timmy turner,nigga you a vegetable,we turn you to a turnip,and my niggas in there you know that we down to turn up,Aye,yeah",
    },
    {
      id: 2,
      title: "Pak teaching kids how to rap",
      lyrics:
        "the trap,niggas really think the beat trash but it's just your raps,all these niggas do is cap now,let me come and pack these rappers in a box,you niggas going to get shipped,they be saying what the fuck I'm on,these niggas get shipped to another country like I'm Amazon,niggas know that I keep flowing,wildin when the ammo gone,if they want the whole clip,I give them the whole round,until this shit go around,and tilt your head to the ground,make a bitch nigga frown,this shit is full like circuses,and you niggas is some clowns,and don't rap again,AND I SWEAR YOU NIGGAS IS ASS,GO AND LEARN SOME LESSONS,NEVER GO AND SKIP CLASS,It's Pak",
    },
    {
      id: 3,
      title: "As told by Pakuro",
      lyrics:
        "Just on the trap,you know that we be runnin laps,sometimes I open my eyes,And I still feel lifeless,sinning in all my days,so sometimes I follow vices,you say if I hit em with right click/clique,most niggas goin copy,I had to do this nice,but most of these niggas sloppies,feeling like hockey,I always pull up with a stick,and I know I got a lot of things to lose,and a lot of things to risk,all this ice on my wrist,really just make me pissed,cause life is optimistic,when you just focus on the riches,focus on the girls,and you focus on the bitches,focus on your niggas,and you focus on the snitches,if you talk too much man you end up with the stitches,and I'm so wicked,I feel like the Witcher,niggas in my frames but they don't get the picture,be like when I lick her when I down her and lick her,see that type of shit she's on but I feel like I might pick her,even if I lose it all in this second,everybody trying to use my loyalty as a weapon,everything that I did is the reason they reckon,if they keep talking,this like a ship I wrecked them,I wanna give love and spread it all above,every time I give more they say that shit ain't enough,see this shit been tough,I'm talking hard knock no daisy,I feel like these niggas who I love really hate me,I gotten soft like crazy,niggas think they got this but they couldn't get me if they paid me,lay me,down in the ground like X,cause I feel like this world of mess,that leaves me in stress,tell me what's the test,am I passing?,niggas don't tell me hello when I pass them,yes they want to see me crashing,fuck your action,I don't give a fuck about your life,I never asked em,",
    },
    {
      id: 4,
      title: "Pak's truth",
      lyrics:
        "Nigga feel your heart,see a soul in there?,and I know most don't care,but I still love you even when they didn't,I still was with you when they wasn't,I still give you my all even when I couldn't,see I had to give them my all just to show that time will pass,these niggas want to see me crash,I just turned them all to ash,cause I wanna see them burn,cause niggas will never learn,until they feel the fire,and my brain is wired,I rap hard but never get tired,I'm energized,I'm very wise,know that's all lies,cause I just go through this life and I learn all my lessons,I feel like a king cause I once was a peasant,niggas think they get me cause I justifying-ly wrecked them,but I never ever wrecked them,my money keeps a-mounting,the way that I'm rapping,people say that it's astounding,but they don't really understand the way that I'm sounding,sometimes we gotta look at this and realize that we can go around them,didn't even plan it,niggas in the chat screamin like they wanna panic,I be feeling like my soul is so filled with anguish,that I don't wanna get angry,I just wanna feel,how do I get away from this pain,I wanna heal",
    },
    {
      id: 5,
      title: "Seriesly",
      lyrics:
        "Like this shit is way too important,niggas got shoes and souls,they wearing jordans,I feel like the way I live life is according,rap a little bit but I hope it don't get boring,snoring,all my niggas,we never sleep,we so damn strong man,we never been weak,I'm talking seven days,your shit been overplayed,baby girl this just like a lay,lay up,my friend said d-rose,I just went to her and told her that she's da rose,baby you a flower,never been a coward,Imma be the king till the second to the hour,I still got the power,no kanye,feel like I got the beef for zelda,no conway,baby girl I ain't never done,cause today I came here to show them I could last,and if the beat don't start then I'm gonna turn this track to ash,focus on the future cause they focus on my past,gotta take off my mask,gotta fight the task,I've been on my missions,shoot my shot and I pray I'm not missing,say it in your ears baby girl,just listen,there's no love songs but I keep on whispering,niggas keep talking about the part that I pissed in,I can't wait from there now I'm rocking,now I'm Pistons (Detroit Pistons),I'm in a different league,I'm in a different seed,I'm trying to give you all your wants and all your needs,the reason why I breed,please don't let me leave,I can be your adam girl,let me be your eve,she said you can't be my adam cause you don't really matter,you can't be my adam cause you don't really matter,please keep it solid,all these niggas all gasps,see them licorice from your eyes but what's the tasks?,niggas don't see the real me,I wear a mask cause they trash,most these niggas so garbage,why? because they never went through hardships,you're a fake hard ship,I'm talking like titanic,baby hold my hand,I swear that you won't panic,please hold me whenever I begin to sink,I ain't trying to rhyme baby,I'm just trying to sing,this is music to my ears whenever you're aware,you look beautiful in whatever you wear",
    },
    {
      id: 6,
      title: "Pakking",
      lyrics:
        "Uh,someone start it off,I said,Everybody scared cause they know I'm a stepper,Shawty got wings,I ain't talking lemon pepper,girl you reign supreme,doesn't matter about the weather,niggas think they more,but I think I'm more clever,more better,give them more bars,baby girl you're the sky,let me give you more stars,they say that I'm good,but I think I'm too hard,baby how you play this just depends on the cards,let me now go far,I wanna go the distance,when I'm speaking in your ears baby girl,just listen,I feel like you not like me,cause you seem kind of different,cause everything I thought it was used to be that but it isn't,please baby girl,why you trippin?,you wanna go overseas to other countries and a different county,but you can never count me out,I can understand the shit that come out of your mouth,baby girl you got wings,and I ain't talkin bout no chicken,YOU A ANGEL,and I just hope you are single,baby girl let me release these singles,so you can listen to these songs that I send in the morning,when I hear you yawning,when I understand a little bit of goin,when I understand that you're in a whole different mind frame,baby girl I just wanna show you that when I shoot my shot,you are my aim",
    },
    {
      id: 7,
      title: "Pak's Poetry",
      lyrics:
        "When you have a beat like this,You just gotta go kill,No feel,I feel like I'm the Fresh Prince,Man she don't wanna cuff,She only want me in pins,She want my fingers all over her ass,I'm leaving prints,My niggas whipping in the window tint,It's a different car seat,It's a different drive,It's a type of beat that make a rapper feel alive,And most these rappers died,And most these bitches cried,And everyone talking about 'why?',And they telling me everybody got away,[Inaudible],These niggas know that I'm whipping,Sippin,Know that I'm dippin,All blue on me,but no I'm not crippin,freestyling off the top,it's no riddance,I love you,Hope that you love me,When it comes to rapping,nigga you can never stop me,Pull up with the stick,you would think this is hockey,Niggas go to sleep and get mad when they wake up cause they not me,You copy,With the right click,And my niggas so sick,We can do this shit like a movie,no Netflix,All we wanna do is chill,Niggas know that I'm going up the hills,To get my crowns,My kin is proud,All the words that I pronounce,I'm from a town,Most niggas won't get down, You better get up boy if you ever fall,Everybody going to be grateful when you answer the call,y'all",
    },
    {
      id: 8,
      title: "Shooting my shot",
      lyrics:
        "Call me yo slut,She a bad bitch so I put it in her butt,She said I'm like a squirrel,cause I'm tryin to get a nut,Damn girl,basically I'm just trying to fuck,Where did I go?,Where did all my gentlemens be?,She said that I ain't got no manners,Well I gotta man up and I got mansions,It's a whole different dimension,This the type of shit when you die,you gotta mention,In heaven,Girl you look like you was sent there,I be feeling like when I'm doing this,I'm sincere,Trying to show you all the flowers and any hours,Can't rap with any of these niggas cause most of them be cowards,And I wanna give you love even when you never shower,Baby girl I feel like a tower,I ain't talking no league,but I am a LEGEND,Put yourself first baby,I ain't coming second,I am in a whole different league,Whenever I breathe,She said next to me is where she wanna be,For the rest of her life,Guess she's next to my wife,Cause I be with the mistress,Now I shoot my shot and it never misses,They say I'm a king,#1 is where they're listed,I don't listen to these niggas cause all they do is dissing,I'm never missing,Shoot my shot again,I'm Scottie Pippen,Ha",
    },
    {
      id: 9,
      title: "Rocking the Pak",
      lyrics:
        "Bad bitches next to me,They wanna kiss me,This the type of beat where you gotta spread love,Gotta look above,Gotta give more than just a little or enough,Gotta push the limit,Niggas having stress,well I'll show you where to send it,I ain't the nigga that you think will ever fail,She said that she wanna fuck online,nah I tell her this ain't no email,And I don't want no e-relationships or the e-date,Niggas know that online,they deepfake,They e-fake,Niggas know that I knew this too easy,I know they need me,Inside the path is someplace where they won't leave me,Cause they know that I'm spreading quicker than a disease be,And they know that I'm never at a home,sick,Like a sick nigga,who is sick and lonely and full of covid,And I need no vaccines,These niggas be @-ing me,I feel like when I'm doing this,I'm a mad team,This is a mad demonstration,I'm a living in a nation where it is just cool to be hated,I'm the sensation,I'm just sick of what them be sayin,Now I'm the master,I guess I'm just sen-sei-ing(saying),Niggas think that I'm a rat,This ain't no mutant no ninja turtles,I made their bitch squirt like team squirtle,Niggas getting mad cause they didn't get the words though,Let me bring her back when I was flying like a bird though,Niggas think this an essay with a re-word-drobe",
    },
    {
      id: 10,
      title: "Who the Pak is this?",
      lyrics:
        "Not mediocre,Play yo cards right cause nigga I'm the joker,On some king shit,I spit the type of words,that makes niggas wanna say shit,And I ain’t talking about no bars,cause these niggas won't hop on the ring,They no feathers,My nigga talk shit,I'm sunny like Mayweather,You can never stop me,These niggas run from me,If he tried to battle me,then he a dummy,These niggas crummy,Now lets change the subject,I'm talking bout how,these bitches hit me up in only one sec,I'm trying to say that I love you,and you act like you never done that,Niggas think that when they hate you,they make me run back,I'm on this track and tell them that I'm Pak,And forever tied to rap,I send them out in a pack,And I ain't talking no shipment,They say they wanna be a relationship,But they don't really know what that shit meant,See these kids are too young and they too dumb,And everytime they see you get it,They want you to run,And I will never chase anything but this cash and paper,This the type of raps that makes these niggas wanna hate ya",
    },
    {
      id: 11,
      title: "Pak got something to say",
      lyrics:
        "Hold up,Listen,I said the way that we live is fashion,It is all by design,As they saying,I'm divine,But I'm really just designed to my mind,I been hoping that I never cross the line,It's just time,Baby you been weighing on my mind,And you shine,Brighter than any star,I feel like you were on par,On shit that niggas couldn't even imagine,Feeling like you more fire,than a damn dragon,Niggas need to get back,when you was in a beauty pageant,You the winner,I'm tired of being a sinner,Girl you look good,That pussy is as good as dinner,I be feeling like most of these niggas just beginners,But baby girl you know that,we winning if we step in here,See,this is what money could buy,Baby girl you gotta reason,I swear that you fly,This is the reason when we just do,we ain't gotta try,[Inaudible],I never seen a nigga like me,Unlikely,You ain't gotta type in a key,I'm never bored,She be sayin I'm a baller cause all I do is score,Who you doing this for,Been a king since four,Niggas know that I wear the crown,I don't need a award,I'm just trying to show you that,this shit is a tour,Most these rappers getting sleep,I ain't trying to be fake deep,But you the person I wake up to every day and every week,And everybody,what you sow is what you really reap,Take a peek inside my life,No closet,I ain't getting badder,cause niggas making me pause it,Niggas say they want this life,but what the cost is,Niggas know that I do this right,And I know that I'm in Boston like Celtics,Only wanna sell tickets,Open your eyes because if you blink,you might miss it,Baby girl I love you and your ears,I keep whispering,Niggas keep watch whenever we kissing,This is what bliss is",
    },
    {
      id: 12,
      title: "Pak Snapping with the Rappin",
      lyrics:
        "I'm a different entity,We chillin like we family,Niggas think they seals,I be thinking like a manatee,The mana-beat is different from you,see just we in here the beat cool,Now listen what we do,We ain't here to play,Man we just here to pray,And show these niggas how we get in church,Put in this work,I'm the type of nigga to never pop Percs,Cause I realize,in myself is where I really gotta search,I be looking for a window,You be looking for a widow,Niggas looking for the belt,because they always lean below,Nigga you know that I'm the greatest,Nah I'm really not but,I know that there is no shaming,Trying to put inside this work,Trying to be the hardest,Niggas know that I'm an artist,Niggas be thinking they artistic,But really autistic,But that's just some stick shit,Niggas end up picking on me,You end up like a statistic,I go so ballistic,Niggas know that I'm a king,so go ahead and list it,Shooter like the Pistons,Nigga I ain't trippin,I ain't talking no red,I'm the type to lead these niggas in bed,Cause they sleep,Go ahead and take a nap,Nigga I'm just here to chill with my bros,and do a little rap,This ain't no app but I still snap,When I chat,And I'm here for these girls,cause I'm trying to get the cat,Off the mat",
    },
    {
      id: 13,
      title: "Pak's View (Incomplete)",
      lyrics:
        "This shit that I got I know some would sit and laugh,But this shit that I got I know some would kill to have,Know my race ain’t over yet,Man this shit has been a marathon,Only competitions is myself cant do comparisons,Whenever you depressed,They tell you pop a pill(in),But For me and my self,That lifestyle was not appealing,I'm just raising the ceiling,Raising the bar,Ever since we were children,We looked up to the stars,Now we shining ain't we?,Gotta stay focused,Even when the world wants us angry,Be jealous of a nigga?,Man that just ain't me,I know that talent comes in many variety,I'm motivated by my brothers,They inspire me,Don't expect the way you love to be reciprocated,Niggas want and need on paper but never participated",
    },
  ]);
  const [songsIndex, setSongsIndex] = useState(0);

  const [currentSong, setCurrentSong] = useState("");

  const [open, setOpen] = useState(false);
  const node = useRef();

  const isExpanded = open ? true : false;
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const [isEnabled, setIsEnabled] = useState(false);

  // clicking on a song from song list
  const handleClickSong = (id) => {
    setShowSongList(false);

    // sets the index with value of id
    setSongsIndex(id);

    // depending on which song has been chosen, music player will have a song loaded based on the id
    switch (id) {
      case 1:
        setCurrentSong(SaintPak);
        break;
      case 2:
        setCurrentSong(PakTeaching);
        break;
      case 3:
        setCurrentSong(AsToldByPak);
        break;
      case 4:
        setCurrentSong(PakTruth);
        break;
      case 5:
        setCurrentSong(Seriesly);
        break;
      case 6:
        setCurrentSong(Pakking);
        break;
      case 7:
        setCurrentSong(PakPoetry);
        break;
      case 8:
        setCurrentSong(ShootingMyShot);
        break;
      case 9:
        setCurrentSong(RockingThePak);
        break;
      case 10:
        setCurrentSong(WhoThePak);
        break;
      case 11:
        setCurrentSong(PakGotSome);
        break;
      case 12:
        setCurrentSong(PakSnappin);
        break;
      case 13:
        setCurrentSong(PakView);
        break;
      default:
        alert("Not part of the song list");
    }

    document.querySelector(".burger-menu").classList.add("show");
  };

  // return to the song list
  const returnToList = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowSongList(true);
    setOpen(!open);
    document.querySelector(".burger-menu").classList.remove("show");
  };

  useEffect(() => {
    // Pass in the isEnabled state
    updateTheme(isEnabled);
  }, [isEnabled]);

  const toggleState = () => {
    setIsEnabled((prevState) => !prevState);
  };

  const updateTheme = (isDarkEnabled) => {
    // Get all available styles
    const styles = getComputedStyle(document.body);

    // Get the --black and --white variable values
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");

    // Optional shorthand constant for accessing document.documentElement
    const docEl = document.documentElement;

    if (isDarkEnabled) {
      docEl.style.setProperty("--background", black);
      docEl.style.setProperty("--foreground", white);
      // document.querySelector("html").classList.add("darkmode");
    } else {
      docEl.style.setProperty("--background", white);
      docEl.style.setProperty("--foreground", black);
      // document.querySelector("html").classList.remove("darkmode");
    }
  };

  // closes burger menu when user clicks outside
  useOnClickOutside(node, () => setOpen(false));

  return (
    <div className="app">
      <header className="header">
        <ThemeProvider theme={theme}>
          <div ref={node} className="burger-menu">
            <FocusLock disabled={!open}>
              <StyledBurger
                aria-label="Toggle menu"
                aria-expanded={isExpanded}
                open={open}
                onClick={() => setOpen(!open)}
              >
                <span />
                <span />
                <span />
              </StyledBurger>
              <StyledMenu open={open} aria-hidden={!isHidden}>
                <p href="/" tabIndex={tabIndex} onClick={() => returnToList()}>
                  Return to Song List
                </p>
              </StyledMenu>
            </FocusLock>
          </div>
        </ThemeProvider>
        <strong className="title-logo">Pak's Raps</strong>
        <nav className="header-nav">
          <label className="toggle-wrapper" htmlFor="toggle">
            <div className={`toggle ${isEnabled ? "enabled" : "disabled"}`}>
              <span className="hidden">
                {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
              </span>
              <div className="icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-sun-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-moon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                </svg>
              </div>
              <input
                id="toggle"
                name="toggle"
                type="checkbox"
                checked={isEnabled}
                onClick={toggleState}
              />
            </div>
          </label>
        </nav>
      </header>
      <section className="list-section container">
        {showSongList && (
          <strong className="choose-song-text">
            Pick a rap to listen to and see the lyrics.
          </strong>
        )}
        <ol className="song-list">
          {showSongList &&
            songs.map((song) => (
              <li
                key={song.id}
                className="song"
                onClick={() => handleClickSong(song.id)}
              >
                {song.title}
              </li>
            ))}
        </ol>
        {!showSongList && <Lyrics songs={songs} index={songsIndex} />}
      </section>
      {!showSongList && (
        <AudioPlayer
          src={currentSong}
          onPlay={(e) => console.log("onPlay")}
          header={songs[songsIndex - 1].title + "\n\nPakuro"}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          className="music-player"
        />
      )}
    </div>
  );
}

export default App;
