//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.56;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.56] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * - If used with Battle Core's <Command Text: x>, the Command Text notetag
 *   will take priority in the command window, but the List Name notetag will
 *   appear in the skill list.
 * - This does not change the display text. If you'd like to change that, use
 *   the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Non-consumable items will not be consumed but their amounts will be
 *     required.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * - If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *   <Passive State: x> will always have the passive state be available no
 *   matter if the skill is equipped or not, as long as the skill is learned.
 *   - If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 *   - Just like with regular <Passive State: x> notetag:
 *   - If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.56: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where <param Buff Turns: +x> and <param Debuff Turns: +x>
 *    would cause a crash. Fix made by Olivia.
 * 
 * Version 1.55: March 16, 2026
 * * Documentation Update!
 * ** Added extra clarity for <Toggle> notetag:
 * *** Just like with regular <Passive State: x> notetag:
 * *** If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * 
 * Version 1.54: December 15, 2025
 * * Documentation Update!
 * ** Added extra clarity for <List Name: name> notetag:
 * *** If used with Battle Core's <Command Text: x>, the Command Text notetag
 *     will take priority in the command window, but the List Name notetag will
 *     appear in the skill list.
 * *** This does not change the display text. If you'd like to change that, use
 *     the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * * Documentation Update!
 * ** Added extra clarity for <Passive State: x>:
 * *** If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *     <Passive State: x> will always have the passive state be available no
 *     matter if the skill is equipped or not, as long as the skill is learned.
 * *** If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x5a882d=_0x1123;(function(_0xd8f97e,_0x596680){const _0xe2c30c=_0x1123,_0x556b64=_0xd8f97e();while(!![]){try{const _0x1da24a=parseInt(_0xe2c30c(0x1fa))/0x1*(parseInt(_0xe2c30c(0x126))/0x2)+-parseInt(_0xe2c30c(0x28d))/0x3*(parseInt(_0xe2c30c(0x2a0))/0x4)+parseInt(_0xe2c30c(0x1e6))/0x5*(parseInt(_0xe2c30c(0x8b))/0x6)+parseInt(_0xe2c30c(0x322))/0x7*(-parseInt(_0xe2c30c(0x1f7))/0x8)+parseInt(_0xe2c30c(0x2d4))/0x9+-parseInt(_0xe2c30c(0x2e0))/0xa*(parseInt(_0xe2c30c(0x78))/0xb)+parseInt(_0xe2c30c(0x147))/0xc*(-parseInt(_0xe2c30c(0x181))/0xd);if(_0x1da24a===_0x596680)break;else _0x556b64['push'](_0x556b64['shift']());}catch(_0x260b9a){_0x556b64['push'](_0x556b64['shift']());}}}(_0x5c5c,0xb042c));var label=_0x5a882d(0x12e),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1fd30f){const _0x5c7694=_0x5a882d;return _0x1fd30f['status']&&_0x1fd30f['description'][_0x5c7694(0x129)]('['+label+']');})[0x0];function _0x1123(_0x1075b0,_0xece838){const _0x5c5cbc=_0x5c5c();return _0x1123=function(_0x1123ed,_0x4d26d6){_0x1123ed=_0x1123ed-0x77;let _0x2d655d=_0x5c5cbc[_0x1123ed];return _0x2d655d;},_0x1123(_0x1075b0,_0xece838);}function _0x5c5c(){const _0x1b6b02=['getColor','CoreEngine','_checkingVisuMzPassiveStateObjects','StackDebuffMax','groupDefeat','MeetsAuraNoteConditions','commandNameWindowCenter','isUserBypassRemoveStatesByDamage','allowCreateShopStatusWindow','decreaseBuff','Window_SkillList_setActor','Game_BattlerBase_initMembers','skill','isBottomHelpMode','width','description','ceil','useDigitGrouping','checkSkillTypeMatch','slice','regenerateAll','_toggleSkillColor','gaugeColor1','iconWidth','%1-%2-%3','user','onEraseStateCustomJS','StateID','updateVisibility','Scene_Skill_helpWindowRect','convertTargetToStateOriginKey','_bypassRemoveStateDamage_user','TurnFontSize','ParseStateNotetags','Game_BattlerBase_refresh','resetTextColor','min','Game_BattlerBase_meetsSkillConditions_Toggle','fontSize','isDebuffAffected','createItemWindow','applyBuffTurnManipulationEffects','makeAdditionalSkillCostText','isUseModernControls','onEraseDebuff','actor','_endingBattle','changeTextColor','addDebuffTurns','trim','index','commandName','isBuffPrevented','ParseAllNotetags','gaugeLineHeight','gaugeBackColor','GaugeCurrentJS','_bypassRemoveStateDamage_value','isStateCategoryAffected','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createPassiveStatesCache','InputComboSkills','SkillSceneStatusBgType','boxWidth','animationId','traitObjects','stateHpSlipDamageJS','itemWindowRectSkillsStatesCore','exit','some','_cache_toggleExclusionGroups','TurnEndOnMap','sortPriority','length','addPassiveStatesFromOtherPlugins','uiInputPosition','onEraseDebuffJS','VisuMZ_2_ClassChangeSystem','createAllSkillCostText','drawIcon','isMaxDebuffAffected','checkSkillConditionsNotetags','clearAllStateOrigins','passiveStates','recoverAll','LabelOutlineWidth','ToggleOffAnimationID','_stateDisplay','changeOutlineColor','Skills','VisuMZ_3_ItemConcoctSkills','Game_BattlerBase_overwriteBuffTurns','addWindow','prototype','isSkillUsableForAutoBattle','mainFontFace','gradientFillRect','Parse_Notetags_Skill_JS','removeStatesAuto','checkCacheKey','getStateReapplyRulings','skillCostSeparator','Game_BattlerBase_increaseBuff','name','toggleExclusionGroups','helpWindowRectSkillsStatesCore','clearStates','addDebuff','637109iNMjjA','Settings','text','floor','bypassRemoveStatesByDamage','icon','gainHp','resetStateCounts','statePassiveConditionJS','addPassiveStates','addState','adjustItemWidthByShopStatus','contents','iconHeight','right','onAddStateMakeCustomSlipValues','setStateTurns','friendsUnit','Sprite_StateIcon_updateFrame','7771398jfnFWz','stateMpSlipDamageJS','Parse_Notetags_State_ApplyRemoveLeaveJS','skillTpCost','actorId','resetFontSettings','skillLearn','skillId','onDatabaseLoaded','onChange','onEraseStateGlobalJS','SkillConditionJS','<actor-%1>','uiMenuStyle','isGroupDefeatStateAffected','attacker','death','statesByCategory','MaxTurns','active','shopStatusWidth','colSpacing','ParseClassIDs','_tempBattler','onRemoveState','JSON','actions','stateHpSlipHealJS','SkillContainers','removeStatesByCategoryAll','Game_BattlerBase_states','drawActorIconsAllTurnCounters','_actor','onExpireState','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Game_BattlerBase_eraseState','setPassiveStateSlipDamageJS','target','HiddenSkillTypes','Game_BattlerBase_eraseBuff','_subject','fillRect','drawItem','deadMembers','Actor-%1-%2','note','Window_SkillList_maxCols','_stateRetainType','process_VisuMZ_SkillsStatesCore_Skill_Notetags','normalColor','_skillTypeWindow','TurnOffsetY','setDebuffTurns','Game_Actor_skillTypes','Game_Battler_addBuff','skills','ItemConcoctSkills','_checkingPassiveStates','CanConcoct','equipPassives','center','isSkillTypeMatchForUse','paramBuffRate','parameters','StackBuffMax','Enemy','LabelFontMainType','getSkillIdWithName','Sprite_Gauge_redraw','isValid','updateFrame','inBattle','_itemWindow','outlineColor','Window_SkillType_initialize','_stateData','toggleOffLocation','Game_Battler_regenerateAll','currentClass','hasToggleSkillAntiCheck','<member-%1>','Game_Troop_setup','buttonAssistSwitch','opacity','_stypeId','VisuMZ_1_ElementStatusCore','stateCategoriesResisted','battleMembers','MeetsAuraStateConditions','setStateData','getStypeIdWithName','%1%','ALL','mainFontSize','checkShowHideJS','ShowTurns','defaultToggleSkillSetting','randomInt','MultiplierJS','Window_SkillList_makeItemList','_costSettings','mainCommandWidth','fontFace','textColor','applyDebuffTurnManipulationEffects','remove','skillMpCost','calcWindowHeight','Scene_Skill_itemWindowRect','anchor','meetsPassiveStateConditionJS','VisuMZ_4_SkillContainers','Game_Battler_onBattleEnd','categories','auraStateIDs','process_VisuMZ_SkillsStatesCore_Notetags','makeSuccess','onRegenerateCustomStateDamageOverTime','Item-%1-%2','Toggles','Game_BattlerBase_resetStateCounts','currentMaxValueSkillsStatesCore','split','setStateOrigin','Scene_Skill_skillTypeWindowRect','Game_Player_refresh','applyStateCategoryRemovalEffects','requestFauxAnimation','isSkillToggled','currentValue','retrieveStateColor','Game_BattlerBase_recoverAll','ShowData','_data','StateTurnsEnemyChangeBy','createKeyJS','ReapplyRules','_shopStatusWindow','ForcedMatrix','isMaxBuffAffected','onExpireDebuff','SortByIDandPriority','getStateIdWithName','hpDamage','_skillIDs','innerWidth','ignore','Window_StatusBase_drawActorIcons','labelColor','BattleHiddenSkillTypes','sort','applyItemUserEffect','isAutoBattle','addPassiveStatesTraitSets','standardIconWidth','9178gtTbFz','ColorDebuff','_buffTurns','includes','buffLength','_cache_CheckBypassRemoveStatesByDamage','ActionEndUpdate','_scene','SkillsStatesCore','IconStypeNorm','maxCols','forgetSkill','toLowerCase','shift','equips','_lastStatesActionEndFrameCount','numberFontFace','recalculateSlipDamageJS','onAddBuffGlobalJS','_checkingTraitsSetSkillsStatesCore','updateCommandNameWindow','Game_Battler_addDebuff','valueFontSize','clearStateOrigin','drawTextEx','CmdStyle','drawExtendedSkillsStatesCoreStatus','makeCommandName','maxItems','match','mpCost','slipHp','isToggleSkill','55980kPvRNX','CanThrowType','isPassiveStateStackable','currentMaxValue','Window_Base_changeTextColor','SkillActorPaySkillCost','isAppeared','Game_BattlerBase_skillMpCost','shopStatusWindowRectSkillsStatesCore','MAT','passiveStateObjects','skillTypeWindowRectSkillsStatesCore','isUseSkillsStatesCoreUpdatedLayout','Costs','canSortSkillTypeList','Game_Variables_onChange','_states','iconIndex','bitmap','onEraseDebuffGlobalJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','States','applyStateTurnManipulationEffects','Window_SkillList_includes','Window_Base_createAllSkillCostText_Toggle','Game_BattlerBase_addNewState','Weapon-%1-%2','stateData','_stateOrigin','ToggleOnTextColor','statusWindowRect','Sprite_Gauge_gaugeRate','AURA_SYSTEM_ENABLED','redraw','setBuffTurns','item','Turns','buffIconIndex','loadBitmap','commandNameWindowDrawText','addAuraPassiveStateIDs','meetsSkillConditionsEnableJS','Skill-%1-%2','iconText','makeItemList','registerCommand','updatedLayoutStyle','endAction','isAlive','_skillWindow','stateTpSlipDamageJS','canPaySkillCost','slipTp','STRUCT','helpWindowRect','TextJS','removeStatesByCategory','\x5cFS[22]\x5cC[8][OFF]','3289DbNzLT','_cache','MAXMP','StateTurnsActorChangeTo','removeOtherStatesOfSameCategory','CheckVisibleSkillNotetags','drawItemStyleIcon','getStateRetainType','parse','buff','success','Game_Switches_onChange','_tempActor','isStateAffected','isTargetBypassRemoveStatesByDamage','windowPadding','convertGaugeTypeSkillsStatesCore','back','constructor','MAXHP','totalStateCategoryAffected','_cache_getPassiveStateConditionClassesData','Game_BattlerBase_isStateResist','getAuraPassiveStatesFromObj','getStateOrigin','keys','labelOutlineColor','fontBold','stateTurns','onBattleEnd','isPlaytest','rgba(0,\x200,\x200,\x200)','\x5cI[%1]%2','menuActor','removeState','meetsPassiveStateConditionClasses','shopStatusWindowRect','getSkillChangesFromState','removeByDamage','_currentTroopUniqueID','CheckIncompatibleStates','[ON]','VisuMZ_3_ItemThrowSkills','meetsPassiveStateConditionSwitches','helpAreaTop','initialize','Game_Unit_isAllDead','Game_BattlerBase_traitsSet','version','Parse_Notetags_Skill_Sorting','buffTurns','_prevPassiveJsCounter','CmdWidth','drawActorStateTurns','CheckBypassRemoveStatesByDamage','currentValueSkillsStatesCore','MDF','convertPassiveStates','ForceListRange','hasSkill','<troop-%1>','redrawSkillsStatesCore','AvailableChainSkill','buttonAssistText1','test','_turnDisplaySprite','call','onSkillOk','front','AmplifyWith','Game_Action_executeHpDamage_bypassStateDmgRemoval','onExpireBuffJS','initMembersSkillsStatesCore','addNewState','enemy','stateEraseJS','getCurrentTroopUniqueID','setup','createSkillCostText','Actor','Parse_Notetags_State_Category','lineHeight','itemLineRect','gainMp','debuffTurns','_stypeIDs','drawItemStyleIconText','skillTypes','autoRemovalTiming','Sprite_Gauge_initMembers','Game_Battler_isStateAddable','textSizeEx','reset','AGI','Gauge','clearStatesWithStateRetain','onEraseBuffGlobalJS','isLearnedSkill','Window_SkillStatus_refresh','makeResistedStateCategories','onAddStateCustomJS','5oODPBA','CheckVisibleBattleNotetags','ParseSkillChangessIntoData','isAllDead','DefaultToggle','isSkillCostShown','Armor-%1-%2','isBuffAffected','isStateResist','allSwitchOn','stateTpSlipHealJS','DataOffsetX','removeStatesByDamage','ConvertParams','ToggleOff','setSkillToggle','testSkillStatesCoreNotetags','7232TLqXdp','getStateDisplay','Window_StatusBase_placeGauge','258KRcPMJ','checkSkillConditionsSwitchNotetags','ColorNeutral','CheckVisibleSwitchNotetags','standardIconHeight','stateId','setStypeId','getCurrentStateActiveUser','toggleOn','commandStyleCheck','setItem','commandNameWindowDrawBackground','paramValueByName','toggleOff','labelFontFace','EVAL','_passiveStateResults','gaugeColor2','getStateOriginByKey','clearStateDisplay','GaugeMaxJS','Game_BattlerBase_clearStates','changeSkillsThroughStateEffects','prepareResetStateCounts','IconStypeMagic','CmdTextAlign','damage','onExpireBuff','Name','onAddBuff','_cache_isToggleSkill','_commandNameWindow','toggleType','clearStateData','Window_SkillList_drawItem','_stateSteps','isDead','aliveMembers','value','Game_Unit_deadMembers','multiclasses','deathStateId','refreshAllMembers','Enemy-%1-%2','overwriteBuffTurns','ARRAYFUNC','eraseBuff','clear','drawActorStateData','add','ValueFontMainType','indexOf','getPassiveStatesFromObj','onEraseBuffJS','debuffColor','isSceneBattle','changePaintOpacity','Class-%1-%2','_battler','MeetsAuraObjConditions','_prevPassiveJsResults','Game_Action_applyItemUserEffect','applySkillsStatesCoreEffects','VisuMZ_3_EvoMatrixSkills','FieldSkills','isBuffOrDebuffAffected','PassiveStates','_cache_getPassiveStateConditionSwitchData','untitled','itemWindowRect','heal','process_VisuMZ_SkillsStatesCore_CheckForAuras','isStateCategoryResisted','setStatusWindow','skillTypeWindowRect','eraseState','isCommandEnabled','getStateData','CalcJS','VisuMZ_1_MainMenuCore','updateHelp','VisuMZ_1_ItemsEquipsCore','makeCommandList','isBuffExpired','concat','Parse_Notetags_Skill_Cost','stepsForTurn','regenerateAllSkillsStatesCore','_stored_debuffColor','testApply','mainAreaTop','meetsSkillConditionsGlobalJS','log','anySwitchOn','uiHelpPosition','labelOutlineWidth','_colorCache','createTurnDisplaySprite','ARRAYEVAL','updateStatesActionEnd','Buffs','subject','_cache_getPassiveStatesFromObj','_categoryWindow','LayoutStyle','opponentsUnit','filter','hasStateCategory','RefreshCacheSwitch','_buffs','isEnemy','MatchLabelColor','valueOutlineWidth','ValueOutlineWidth','Game_Actor_forgetSkill','_prevPassiveJsFrameCount','traitsSet','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','toUpperCase','Game_Action_isValid','getClassIdWithName','LearnedChainSkill','DataFontSize','SkillID','createShopStatusWindow','clamp','adjustSkillCost','itemAt','max','Window_Base_drawText','format','_stateIDs','createCommandNameWindow','meetsPassiveStateGlobalConditionJS','Game_Action_testApply','rgba(0,\x200,\x200,\x201)','LearnedMatrix','executeHpDamage','isSkillHidden','ATK','scrollTo','onExpireStateJS','ItemAmplifySkills','isStateAddable','allIcons','FieldSkill','Sprite_StateIcon_loadBitmap','2382BpmBgM','slipMp','addStateTurns','VisuMZ_3_ItemAmplifySkills','labelFontSize','states','playEquip','ColorNegative','Scene_Skill_onItemOk_Toggle','stateMpSlipHealJS','_result','drawText','none','_currentActor','members','makeCurrentTroopUniqueID','anySwitchOff','alterSkillName','increaseBuff','4308xPpsoc','_skillChangesFromState','multiClass','onAddStateGlobalJS','drawExtendedParameter','#%1','_classIDs','Game_Battler_addState','includesSkillsStatesCore','Game_Actor_learnSkill','recover\x20all','ShowJS','_stateMaxTurns','getColorDataFromPluginParameters','DEF','Parse_Notetags_State_SlipEffectJS','EnableLayout','drawSkillCost','RegExp','removeBuff','setBackgroundType','onExpireBuffGlobalJS','replace','_cache_getAuraPassiveStatesFromObj','localeCompare','map','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ToggleType','setStateRetainType','Game_BattlerBase_meetsSkillConditions','EvoMatrixSkills','getAuraPassiveStateIDs','stateExpireJS','process_VisuMZ_SkillsStatesCore_State_Notetags','drawActorIcons','setActor','VisuMZ_0_CoreEngine','addPassiveStatesByPluginParameters','onSkillToggle','skillVisibleJS','RefreshCacheVar','BattleManager_endAction','auto','MatchLabelGaugeColor','statusWindowRectSkillsStatesCore','commandStyle','enemyId','Game_BattlerBase_buffIconIndex','onItemOk','push','removeBuffsAuto','EnemyIndex','11795049VMNKTE','drawActorBuffRates','onExpireStateGlobalJS','Sprite_Gauge_currentValue','addBuffTurns','gainSilentTp','stateColor','DataOffsetY','addBuff','isActor','onAddState','_stored_state-%1-color','150BEZIsP','KnownList','setupSkillsStatesCore','_phase','Game_BattlerBase_die','onExpireDebuffGlobalJS','KnownListRange','isSkill','GaugeDrawJS','initMembers','restriction','activate','buffColor','Game_BattlerBase_decreaseBuff','skillEnableJS','currentDisplayedValue','_bypassRemoveStateDamage_action','FUNC','_stored_buffColor','_statusWindow','ValueOutlineSolid','[OFF]','height','Scene_Boot_onDatabaseLoaded','ItemThrowSkills','Toggle','updateTurnDisplaySprite','Scene_Battle_onSkillOk_Toggle','totalStateCategory','drawActorBuffTurns','meetsSkillConditions','getSkillTypes','isRightInputMode','ActorIDs','canUse','allSwitchOff','hide','LUK','_skillToggle','canChangeSkillsThroughStateEffects','chanceByDamage','callUpdateHelp','%1\x20%2\x20%3','die','clearStateRetainType','refresh','onEraseBuff','<enemy-%1>','greater','paySkillCost','SkillMenuStatusRect','Parse_Notetags_State_PassiveJS','AutoAddState','onExpireDebuffJS','ParseSkillNotetags','state','VisuMZ_3_InputComboSkills','meetsPassiveStateConditions','learnSkill','onExpireStateCustomJS','_stateTurns','stateAddJS','frameCount','itemTextAlign','updateStateTurns','number','1267SRMaby','addChild'];_0x5c5c=function(){return _0x1b6b02;};return _0x5c5c();}VisuMZ[label][_0x5a882d(0x79)]=VisuMZ[label][_0x5a882d(0x79)]||{},VisuMZ['ConvertParams']=function(_0xea5f63,_0x56591e){const _0x3ebb43=_0x5a882d;for(const _0x54fa10 in _0x56591e){if(_0x54fa10[_0x3ebb43(0x143)](/(.*):(.*)/i)){const _0x46fe59=String(RegExp['$1']),_0x5ba317=String(RegExp['$2'])[_0x3ebb43(0x270)]()['trim']();let _0x2dfa6d,_0x313449,_0x4b0e6a;switch(_0x5ba317){case'NUM':_0x2dfa6d=_0x56591e[_0x54fa10]!==''?Number(_0x56591e[_0x54fa10]):0x0;break;case'ARRAYNUM':_0x313449=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449['map'](_0x9642f1=>Number(_0x9642f1));break;case _0x3ebb43(0x209):_0x2dfa6d=_0x56591e[_0x54fa10]!==''?eval(_0x56591e[_0x54fa10]):null;break;case _0x3ebb43(0x25c):_0x313449=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449[_0x3ebb43(0x2b9)](_0x135f36=>eval(_0x135f36));break;case _0x3ebb43(0xa4):_0x2dfa6d=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):'';break;case'ARRAYJSON':_0x313449=_0x56591e[_0x54fa10]!==''?JSON['parse'](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449[_0x3ebb43(0x2b9)](_0x4dc500=>JSON[_0x3ebb43(0x189)](_0x4dc500));break;case _0x3ebb43(0x2f1):_0x2dfa6d=_0x56591e[_0x54fa10]!==''?new Function(JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10])):new Function('return\x200');break;case _0x3ebb43(0x227):_0x313449=_0x56591e[_0x54fa10]!==''?JSON['parse'](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449[_0x3ebb43(0x2b9)](_0x5dd343=>new Function(JSON[_0x3ebb43(0x189)](_0x5dd343)));break;case'STR':_0x2dfa6d=_0x56591e[_0x54fa10]!==''?String(_0x56591e[_0x54fa10]):'';break;case'ARRAYSTR':_0x313449=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449[_0x3ebb43(0x2b9)](_0x2cb2ff=>String(_0x2cb2ff));break;case _0x3ebb43(0x17c):_0x4b0e6a=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):{},_0xea5f63[_0x46fe59]={},VisuMZ['ConvertParams'](_0xea5f63[_0x46fe59],_0x4b0e6a);continue;case'ARRAYSTRUCT':_0x313449=_0x56591e[_0x54fa10]!==''?JSON[_0x3ebb43(0x189)](_0x56591e[_0x54fa10]):[],_0x2dfa6d=_0x313449['map'](_0x1cbb43=>VisuMZ['ConvertParams']({},JSON[_0x3ebb43(0x189)](_0x1cbb43)));break;default:continue;}_0xea5f63[_0x46fe59]=_0x2dfa6d;}}return _0xea5f63;},(_0x2dfa7e=>{const _0x35c93c=_0x5a882d,_0x1deb27=_0x2dfa7e['name'];for(const _0x38ee53 of dependencies){if(!Imported[_0x38ee53]){alert(_0x35c93c(0x35f)[_0x35c93c(0x27c)](_0x1deb27,_0x38ee53)),SceneManager[_0x35c93c(0x368)]();break;}}const _0x41f53e=_0x2dfa7e[_0x35c93c(0x333)];if(_0x41f53e[_0x35c93c(0x143)](/\[Version[ ](.*?)\]/i)){const _0x4963fd=Number(RegExp['$1']);_0x4963fd!==VisuMZ[label][_0x35c93c(0x1b1)]&&(alert(_0x35c93c(0xad)[_0x35c93c(0x27c)](_0x1deb27,_0x4963fd)),SceneManager['exit']());}if(_0x41f53e[_0x35c93c(0x143)](/\[Tier[ ](\d+)\]/i)){const _0x4f247a=Number(RegExp['$1']);_0x4f247a<tier?(alert(_0x35c93c(0x2ba)['format'](_0x1deb27,_0x4f247a,tier)),SceneManager[_0x35c93c(0x368)]()):tier=Math[_0x35c93c(0x27a)](_0x4f247a,tier);}VisuMZ[_0x35c93c(0x1f3)](VisuMZ[label][_0x35c93c(0x79)],_0x2dfa7e[_0x35c93c(0xca)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5a882d(0x38b)],_0x5a882d(0x14c),_0x43a4fa=>{const _0x5c44da=_0x5a882d;VisuMZ['ConvertParams'](_0x43a4fa,_0x43a4fa);const _0x51cec5=_0x43a4fa[_0x5c44da(0x301)]||[],_0x4a97fe=Number(_0x43a4fa[_0x5c44da(0x275)]),_0x30b0eb=$dataSkills[_0x4a97fe];if(!_0x30b0eb)return;for(const _0x2ffe79 of _0x51cec5){const _0x43744c=$gameActors[_0x5c44da(0x351)](_0x2ffe79);if(!_0x43744c)continue;_0x43744c[_0x5c44da(0x311)](_0x30b0eb);}}),PluginManager[_0x5a882d(0x174)](pluginData[_0x5a882d(0x38b)],'SkillEnemyPaySkillCost',_0x567178=>{const _0x41b65f=_0x5a882d;VisuMZ[_0x41b65f(0x1f3)](_0x567178,_0x567178);const _0x1c7660=_0x567178[_0x41b65f(0x2d3)]||[],_0x1b1c11=Number(_0x567178[_0x41b65f(0x275)]),_0x432980=$dataSkills[_0x1b1c11];if(!_0x432980)return;for(const _0x73354a of _0x1c7660){const _0x216f1c=$gameTroop[_0x41b65f(0x29b)]()[_0x73354a];if(!_0x216f1c)continue;_0x216f1c[_0x41b65f(0x311)](_0x432980);}}),PluginManager['registerCommand'](pluginData[_0x5a882d(0x38b)],'StateTurnsActorChangeBy',_0x2f6805=>{const _0x5d5051=_0x5a882d;VisuMZ[_0x5d5051(0x1f3)](_0x2f6805,_0x2f6805);const _0x269d49=_0x2f6805[_0x5d5051(0x301)]||[],_0x7e26fa=Number(_0x2f6805[_0x5d5051(0x33f)]),_0x5b0d8c=Number(_0x2f6805['Turns']),_0x199915=_0x2f6805[_0x5d5051(0x314)];for(const _0x138ef4 of _0x269d49){const _0x3cf5aa=$gameActors['actor'](_0x138ef4);if(!_0x3cf5aa)continue;_0x199915&&!_0x3cf5aa[_0x5d5051(0x18e)](_0x7e26fa)?(_0x3cf5aa[_0x5d5051(0x82)](_0x7e26fa),_0x3cf5aa[_0x5d5051(0x88)](_0x7e26fa,_0x5b0d8c)):_0x3cf5aa[_0x5d5051(0x28f)](_0x7e26fa,_0x5b0d8c);}}),PluginManager['registerCommand'](pluginData[_0x5a882d(0x38b)],_0x5a882d(0x184),_0x3df24a=>{const _0x2d70c5=_0x5a882d;VisuMZ[_0x2d70c5(0x1f3)](_0x3df24a,_0x3df24a);const _0x5901be=_0x3df24a[_0x2d70c5(0x301)]||[],_0x5d3979=Number(_0x3df24a[_0x2d70c5(0x33f)]),_0x266413=Math[_0x2d70c5(0x27a)](Number(_0x3df24a[_0x2d70c5(0x16b)]),0x0),_0x48aae1=_0x3df24a[_0x2d70c5(0x314)];for(const _0x5633ef of _0x5901be){const _0xe05a68=$gameActors[_0x2d70c5(0x351)](_0x5633ef);if(!_0xe05a68)continue;_0x48aae1&&!_0xe05a68['isStateAffected'](_0x5d3979)&&_0xe05a68[_0x2d70c5(0x82)](_0x5d3979),_0xe05a68[_0x2d70c5(0x88)](_0x5d3979,_0x266413);}}),PluginManager['registerCommand'](pluginData[_0x5a882d(0x38b)],_0x5a882d(0x111),_0x5ce061=>{const _0x3777ac=_0x5a882d;if(!$gameParty[_0x3777ac(0xd2)]())return;VisuMZ[_0x3777ac(0x1f3)](_0x5ce061,_0x5ce061);const _0x53975b=_0x5ce061[_0x3777ac(0x2d3)]||[],_0x5cb3e0=Number(_0x5ce061[_0x3777ac(0x33f)]),_0x4dfe55=Number(_0x5ce061['Turns']),_0x32c4af=_0x5ce061[_0x3777ac(0x314)];for(const _0x5090b7 of _0x53975b){const _0x4cf2b5=$gameTroop['members']()[_0x5090b7];if(!_0x4cf2b5)continue;_0x32c4af&&!_0x4cf2b5[_0x3777ac(0x18e)](_0x5cb3e0)?(_0x4cf2b5[_0x3777ac(0x82)](_0x5cb3e0),_0x4cf2b5[_0x3777ac(0x88)](_0x5cb3e0,_0x4dfe55)):_0x4cf2b5[_0x3777ac(0x28f)](_0x5cb3e0,_0x4dfe55);}}),PluginManager['registerCommand'](pluginData[_0x5a882d(0x38b)],'StateTurnsEnemyChangeTo',_0xa0e54f=>{const _0xa5902f=_0x5a882d;if(!$gameParty['inBattle']())return;VisuMZ[_0xa5902f(0x1f3)](_0xa0e54f,_0xa0e54f);const _0x1281fc=_0xa0e54f[_0xa5902f(0x2d3)]||[],_0x32d7fd=Number(_0xa0e54f[_0xa5902f(0x33f)]),_0x1139a3=Math[_0xa5902f(0x27a)](Number(_0xa0e54f[_0xa5902f(0x16b)]),0x0),_0x138cf8=_0xa0e54f[_0xa5902f(0x314)];for(const _0x3dab47 of _0x1281fc){const _0x2843ed=$gameTroop[_0xa5902f(0x29b)]()[_0x3dab47];if(!_0x2843ed)continue;_0x138cf8&&!_0x2843ed['isStateAffected'](_0x32d7fd)&&_0x2843ed[_0xa5902f(0x82)](_0x32d7fd),_0x2843ed[_0xa5902f(0x88)](_0x32d7fd,_0x1139a3);}}),VisuMZ['SkillsStatesCore'][_0x5a882d(0x2f7)]=Scene_Boot[_0x5a882d(0x381)][_0x5a882d(0x93)],Scene_Boot[_0x5a882d(0x381)][_0x5a882d(0x93)]=function(){const _0x95952c=_0x5a882d;VisuMZ[_0x95952c(0x12e)]['Scene_Boot_onDatabaseLoaded'][_0x95952c(0x1c3)](this),this[_0x95952c(0xfe)](),VisuMZ[_0x95952c(0x12e)]['CheckIncompatibleStates']();},Scene_Boot['prototype'][_0x5a882d(0xfe)]=function(){const _0x5efc72=_0x5a882d;this['process_VisuMZ_SkillsStatesCore_CheckForAuras']();if(VisuMZ[_0x5efc72(0x359)])return;this[_0x5efc72(0xbb)](),this[_0x5efc72(0x2c1)]();},Scene_Boot[_0x5a882d(0x381)][_0x5a882d(0xbb)]=function(){const _0x104e59=_0x5a882d;for(const _0x347d84 of $dataSkills){if(!_0x347d84)continue;VisuMZ[_0x104e59(0x12e)][_0x104e59(0x24f)](_0x347d84),VisuMZ[_0x104e59(0x12e)]['Parse_Notetags_Skill_Sorting'](_0x347d84),VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_JS'](_0x347d84);}},Scene_Boot['prototype'][_0x5a882d(0x2c1)]=function(){const _0x520b6a=_0x5a882d;for(const _0x4d375e of $dataStates){if(!_0x4d375e)continue;VisuMZ[_0x520b6a(0x12e)]['Parse_Notetags_State_Category'](_0x4d375e),VisuMZ[_0x520b6a(0x12e)][_0x520b6a(0x313)](_0x4d375e),VisuMZ[_0x520b6a(0x12e)][_0x520b6a(0x2af)](_0x4d375e),VisuMZ[_0x520b6a(0x12e)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x4d375e);}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x316)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x5a882d(0x316)]=function(_0x40d1ab){const _0x339575=_0x5a882d;VisuMZ[_0x339575(0x12e)][_0x339575(0x316)][_0x339575(0x1c3)](this,_0x40d1ab),VisuMZ[_0x339575(0x12e)][_0x339575(0x24f)](_0x40d1ab),VisuMZ[_0x339575(0x12e)][_0x339575(0x1b2)](_0x40d1ab),VisuMZ[_0x339575(0x12e)]['Parse_Notetags_Skill_JS'](_0x40d1ab);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x345)]=VisuMZ[_0x5a882d(0x345)],VisuMZ[_0x5a882d(0x345)]=function(_0x29c323){const _0x3f2a4f=_0x5a882d;VisuMZ[_0x3f2a4f(0x12e)][_0x3f2a4f(0x345)][_0x3f2a4f(0x1c3)](this,_0x29c323),VisuMZ[_0x3f2a4f(0x12e)]['Parse_Notetags_State_Category'](_0x29c323),VisuMZ[_0x3f2a4f(0x12e)][_0x3f2a4f(0x313)](_0x29c323),VisuMZ[_0x3f2a4f(0x12e)][_0x3f2a4f(0x2af)](_0x29c323),VisuMZ['SkillsStatesCore'][_0x3f2a4f(0x8d)](_0x29c323);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x24f)]=function(_0x53659b){const _0x177086=_0x5a882d,_0x8f69ac=_0x53659b[_0x177086(0xb8)];_0x8f69ac[_0x177086(0x143)](/<MP COST:[ ](\d+)>/i)&&(_0x53659b[_0x177086(0x144)]=Number(RegExp['$1'])),_0x8f69ac[_0x177086(0x143)](/<TP COST:[ ](\d+)>/i)&&(_0x53659b['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x5a882d(0x12e)]['Parse_Notetags_Skill_Sorting']=function(_0x4c9143){const _0x36123a=_0x5a882d;if(!_0x4c9143)return;_0x4c9143['sortPriority']=0x32;const _0x1f1edf=_0x4c9143[_0x36123a(0xb8)]||'';_0x1f1edf[_0x36123a(0x143)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x4c9143[_0x36123a(0x36c)]=Number(RegExp['$1']));},VisuMZ[_0x5a882d(0x12e)]['skillEnableJS']={},VisuMZ['SkillsStatesCore']['skillVisibleJS']={},VisuMZ['SkillsStatesCore'][_0x5a882d(0x385)]=function(_0x28d0c3){const _0x2c3edb=_0x5a882d,_0x436082=_0x28d0c3[_0x2c3edb(0xb8)];if(_0x436082[_0x2c3edb(0x143)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x154fff=String(RegExp['$1']),_0x1ad16b='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2c3edb(0x27c)](_0x154fff);VisuMZ[_0x2c3edb(0x12e)][_0x2c3edb(0x2ee)][_0x28d0c3['id']]=new Function('skill',_0x1ad16b);}if(_0x436082[_0x2c3edb(0x143)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x15b2b9=String(RegExp['$1']),_0x5d83dc='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x2c3edb(0x27c)](_0x15b2b9);VisuMZ[_0x2c3edb(0x12e)][_0x2c3edb(0x2c7)][_0x28d0c3['id']]=new Function(_0x2c3edb(0x330),_0x5d83dc);}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1d1)]=function(_0x53d5cd){const _0x16d6bb=_0x5a882d;_0x53d5cd['categories']=[_0x16d6bb(0xe7),'ANY'];const _0x292451=_0x53d5cd[_0x16d6bb(0xb8)],_0x2a76c6=_0x292451[_0x16d6bb(0x143)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x2a76c6)for(const _0xc63058 of _0x2a76c6){_0xc63058[_0x16d6bb(0x143)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x58a738=String(RegExp['$1'])['toUpperCase']()['trim']()[_0x16d6bb(0x105)](',');for(const _0x163c2e of _0x58a738){_0x53d5cd[_0x16d6bb(0xfc)]['push'](_0x163c2e[_0x16d6bb(0x355)]());}}if(_0x292451['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4902b2=RegExp['$1'][_0x16d6bb(0x105)](/[\r\n]+/);for(const _0x1c01a8 of _0x4902b2){_0x53d5cd[_0x16d6bb(0xfc)][_0x16d6bb(0x2d1)](_0x1c01a8[_0x16d6bb(0x270)]()['trim']());}}_0x292451[_0x16d6bb(0x143)](/<POSITIVE STATE>/i)&&_0x53d5cd[_0x16d6bb(0xfc)][_0x16d6bb(0x2d1)]('POSITIVE'),_0x292451[_0x16d6bb(0x143)](/<NEGATIVE STATE>/i)&&_0x53d5cd[_0x16d6bb(0xfc)]['push']('NEGATIVE');},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x80)]={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x313)]=function(_0x4514e1){const _0x73b208=_0x5a882d,_0xf47292=_0x4514e1[_0x73b208(0xb8)];if(_0xf47292[_0x73b208(0x143)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x910ca2=String(RegExp['$1']),_0x2c31d6=_0x73b208(0x15b)['format'](_0x910ca2);VisuMZ[_0x73b208(0x12e)][_0x73b208(0x80)][_0x4514e1['id']]=new Function(_0x73b208(0x317),_0x2c31d6);}},VisuMZ[_0x5a882d(0x12e)]['stateHpSlipDamageJS']={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xa6)]={},VisuMZ['SkillsStatesCore'][_0x5a882d(0x8c)]={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x296)]={},VisuMZ[_0x5a882d(0x12e)]['stateTpSlipDamageJS']={},VisuMZ[_0x5a882d(0x12e)]['stateTpSlipHealJS']={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2af)]=function(_0x12091d){const _0x575d9e=_0x5a882d,_0x761d33=_0x12091d[_0x575d9e(0xb8)],_0x2cc4be='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x761d33['match'](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x37932b=String(RegExp['$1']),_0x20b07a=_0x2cc4be[_0x575d9e(0x27c)](_0x37932b,'damage',-0x1,_0x575d9e(0x145));VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0x366)][_0x12091d['id']]=new Function('stateId',_0x20b07a);}else{if(_0x761d33['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x471dca=String(RegExp['$1']),_0x4af07e=_0x2cc4be[_0x575d9e(0x27c)](_0x471dca,'heal',0x1,'slipHp');VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0xa6)][_0x12091d['id']]=new Function(_0x575d9e(0x1ff),_0x4af07e);}}if(_0x761d33['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x4b45ec=String(RegExp['$1']),_0x55fc20=_0x2cc4be[_0x575d9e(0x27c)](_0x4b45ec,_0x575d9e(0x214),-0x1,'slipMp');VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0x8c)][_0x12091d['id']]=new Function(_0x575d9e(0x1ff),_0x55fc20);}else{if(_0x761d33[_0x575d9e(0x143)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x2a7f51=String(RegExp['$1']),_0x2617e8=_0x2cc4be[_0x575d9e(0x27c)](_0x2a7f51,_0x575d9e(0x240),0x1,'slipMp');VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0x296)][_0x12091d['id']]=new Function('stateId',_0x2617e8);}}if(_0x761d33[_0x575d9e(0x143)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x4fa717=String(RegExp['$1']),_0x314b1e=_0x2cc4be[_0x575d9e(0x27c)](_0x4fa717,_0x575d9e(0x214),-0x1,_0x575d9e(0x17b));VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0x179)][_0x12091d['id']]=new Function(_0x575d9e(0x1ff),_0x314b1e);}else{if(_0x761d33[_0x575d9e(0x143)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x39bdc1=String(RegExp['$1']),_0x52e5d2=_0x2cc4be[_0x575d9e(0x27c)](_0x39bdc1,_0x575d9e(0x240),0x1,_0x575d9e(0x17b));VisuMZ[_0x575d9e(0x12e)][_0x575d9e(0x1f0)][_0x12091d['id']]=new Function(_0x575d9e(0x1ff),_0x52e5d2);}}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x31d)]={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1cc)]={},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2c0)]={},VisuMZ['SkillsStatesCore'][_0x5a882d(0x8d)]=function(_0xe10656){const _0x22e12a=_0x5a882d,_0xa24304=_0xe10656[_0x22e12a(0xb8)],_0x5c2f35=_0x22e12a(0x26f);if(_0xa24304[_0x22e12a(0x143)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x47b345=String(RegExp['$1']),_0x4ffcc0=_0x5c2f35[_0x22e12a(0x27c)](_0x47b345);VisuMZ[_0x22e12a(0x12e)][_0x22e12a(0x31d)][_0xe10656['id']]=new Function(_0x22e12a(0x1ff),_0x4ffcc0);}if(_0xa24304[_0x22e12a(0x143)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x5ae590=String(RegExp['$1']),_0x2fa2a2=_0x5c2f35[_0x22e12a(0x27c)](_0x5ae590);VisuMZ['SkillsStatesCore'][_0x22e12a(0x1cc)][_0xe10656['id']]=new Function(_0x22e12a(0x1ff),_0x2fa2a2);}if(_0xa24304[_0x22e12a(0x143)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x3f0536=String(RegExp['$1']),_0x5cd977=_0x5c2f35['format'](_0x3f0536);VisuMZ[_0x22e12a(0x12e)][_0x22e12a(0x2c0)][_0xe10656['id']]=new Function(_0x22e12a(0x1ff),_0x5cd977);}},VisuMZ['SkillsStatesCore'][_0x5a882d(0x1a9)]=function(){const _0x6138ed=_0x5a882d;if(!VisuMZ[_0x6138ed(0x12e)][_0x6138ed(0x79)][_0x6138ed(0x15c)][_0x6138ed(0x12c)])return;for(const _0xeee9cf of $dataStates){if(!_0xeee9cf)continue;_0xeee9cf[_0x6138ed(0x2ea)]===0x4&&_0xeee9cf[_0x6138ed(0x1d9)]===0x1&&(_0xeee9cf[_0x6138ed(0x1d9)]=0x2);}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x112)]=function(_0x354556,_0x3fab27){const _0x2e747e=_0x5a882d;if(VisuMZ[_0x2e747e(0x112)])return VisuMZ['createKeyJS'](_0x354556,_0x3fab27);let _0x418e68='';if($dataActors['includes'](_0x354556))_0x418e68=_0x2e747e(0xb7)[_0x2e747e(0x27c)](_0x354556['id'],_0x3fab27);if($dataClasses['includes'](_0x354556))_0x418e68=_0x2e747e(0x233)['format'](_0x354556['id'],_0x3fab27);if($dataSkills[_0x2e747e(0x129)](_0x354556))_0x418e68=_0x2e747e(0x171)[_0x2e747e(0x27c)](_0x354556['id'],_0x3fab27);if($dataItems[_0x2e747e(0x129)](_0x354556))_0x418e68=_0x2e747e(0x101)[_0x2e747e(0x27c)](_0x354556['id'],_0x3fab27);if($dataWeapons['includes'](_0x354556))_0x418e68=_0x2e747e(0x161)['format'](_0x354556['id'],_0x3fab27);if($dataArmors[_0x2e747e(0x129)](_0x354556))_0x418e68=_0x2e747e(0x1ec)[_0x2e747e(0x27c)](_0x354556['id'],_0x3fab27);if($dataEnemies[_0x2e747e(0x129)](_0x354556))_0x418e68=_0x2e747e(0x225)['format'](_0x354556['id'],_0x3fab27);if($dataStates[_0x2e747e(0x129)](_0x354556))_0x418e68='State-%1-%2'[_0x2e747e(0x27c)](_0x354556['id'],_0x3fab27);return _0x418e68;},DataManager[_0x5a882d(0x272)]=function(_0x4f10b8){const _0x554c44=_0x5a882d;_0x4f10b8=_0x4f10b8[_0x554c44(0x270)]()[_0x554c44(0x355)](),this[_0x554c44(0x2a6)]=this['_classIDs']||{};if(this[_0x554c44(0x2a6)][_0x4f10b8])return this[_0x554c44(0x2a6)][_0x4f10b8];for(const _0x55b71f of $dataClasses){if(!_0x55b71f)continue;let _0x3096c2=_0x55b71f[_0x554c44(0x38b)];_0x3096c2=_0x3096c2[_0x554c44(0x2b6)](/\x1I\[(\d+)\]/gi,''),_0x3096c2=_0x3096c2[_0x554c44(0x2b6)](/\\I\[(\d+)\]/gi,''),this[_0x554c44(0x2a6)][_0x3096c2[_0x554c44(0x270)]()[_0x554c44(0x355)]()]=_0x55b71f['id'];}return this[_0x554c44(0x2a6)][_0x4f10b8]||0x0;},DataManager[_0x5a882d(0x2ff)]=function(_0x368c74){const _0x1d4f5f=_0x5a882d;this[_0x1d4f5f(0x1d6)]=this[_0x1d4f5f(0x1d6)]||{};if(this['_stypeIDs'][_0x368c74['id']])return this[_0x1d4f5f(0x1d6)][_0x368c74['id']];this[_0x1d4f5f(0x1d6)][_0x368c74['id']]=[_0x368c74['stypeId']];if(_0x368c74[_0x1d4f5f(0xb8)][_0x1d4f5f(0x143)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21a128=JSON[_0x1d4f5f(0x189)]('['+RegExp['$1']['match'](/\d+/g)+']');this['_stypeIDs'][_0x368c74['id']]=this[_0x1d4f5f(0x1d6)][_0x368c74['id']][_0x1d4f5f(0x24e)](_0x21a128);}else{if(_0x368c74['note'][_0x1d4f5f(0x143)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x29d570=RegExp['$1']['split'](',');for(const _0x1a80a8 of _0x29d570){const _0x4d3ef9=DataManager['getStypeIdWithName'](_0x1a80a8);if(_0x4d3ef9)this[_0x1d4f5f(0x1d6)][_0x368c74['id']][_0x1d4f5f(0x2d1)](_0x4d3ef9);}}}return this[_0x1d4f5f(0x1d6)][_0x368c74['id']];},DataManager[_0x5a882d(0xe5)]=function(_0x1f759d){const _0x4970d5=_0x5a882d;_0x1f759d=_0x1f759d[_0x4970d5(0x270)]()[_0x4970d5(0x355)](),this[_0x4970d5(0x1d6)]=this[_0x4970d5(0x1d6)]||{};if(this[_0x4970d5(0x1d6)][_0x1f759d])return this[_0x4970d5(0x1d6)][_0x1f759d];for(let _0xafe365=0x1;_0xafe365<0x64;_0xafe365++){if(!$dataSystem[_0x4970d5(0x1d8)][_0xafe365])continue;let _0x18e6c8=$dataSystem[_0x4970d5(0x1d8)][_0xafe365][_0x4970d5(0x270)]()[_0x4970d5(0x355)]();_0x18e6c8=_0x18e6c8[_0x4970d5(0x2b6)](/\x1I\[(\d+)\]/gi,''),_0x18e6c8=_0x18e6c8[_0x4970d5(0x2b6)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x18e6c8]=_0xafe365;}return this[_0x4970d5(0x1d6)][_0x1f759d]||0x0;},DataManager[_0x5a882d(0xce)]=function(_0x44c12a){const _0x3c44b3=_0x5a882d;_0x44c12a=_0x44c12a[_0x3c44b3(0x270)]()[_0x3c44b3(0x355)](),this[_0x3c44b3(0x11b)]=this[_0x3c44b3(0x11b)]||{};if(this[_0x3c44b3(0x11b)][_0x44c12a])return this[_0x3c44b3(0x11b)][_0x44c12a];for(const _0xa1899f of $dataSkills){if(!_0xa1899f)continue;this[_0x3c44b3(0x11b)][_0xa1899f[_0x3c44b3(0x38b)][_0x3c44b3(0x270)]()[_0x3c44b3(0x355)]()]=_0xa1899f['id'];}return this[_0x3c44b3(0x11b)][_0x44c12a]||0x0;},DataManager[_0x5a882d(0x119)]=function(_0x285565){const _0x3db1c2=_0x5a882d;_0x285565=_0x285565[_0x3db1c2(0x270)]()[_0x3db1c2(0x355)](),this[_0x3db1c2(0x27d)]=this[_0x3db1c2(0x27d)]||{};if(this[_0x3db1c2(0x27d)][_0x285565])return this[_0x3db1c2(0x27d)][_0x285565];for(const _0x1762bc of $dataStates){if(!_0x1762bc)continue;this[_0x3db1c2(0x27d)][_0x1762bc[_0x3db1c2(0x38b)][_0x3db1c2(0x270)]()[_0x3db1c2(0x355)]()]=_0x1762bc['id'];}return this[_0x3db1c2(0x27d)][_0x285565]||0x0;},DataManager['stateMaximumTurns']=function(_0x496990){const _0x582e58=_0x5a882d;this[_0x582e58(0x2ac)]=this[_0x582e58(0x2ac)]||{};if(this[_0x582e58(0x2ac)][_0x496990])return this[_0x582e58(0x2ac)][_0x496990];return $dataStates[_0x496990][_0x582e58(0xb8)][_0x582e58(0x143)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x582e58(0x2ac)][_0x496990]=Number(RegExp['$1']):this[_0x582e58(0x2ac)][_0x496990]=VisuMZ['SkillsStatesCore'][_0x582e58(0x79)][_0x582e58(0x15c)]['MaxTurns'],this[_0x582e58(0x2ac)][_0x496990];},DataManager['getSkillChangesFromState']=function(_0x49fdd4){const _0x2b03a4=_0x5a882d;if(!_0x49fdd4)return{};this['_skillChangesFromState']=this[_0x2b03a4(0x2a1)]||{};if(this[_0x2b03a4(0x2a1)][_0x49fdd4['id']]!==undefined)return this[_0x2b03a4(0x2a1)][_0x49fdd4['id']];const _0x2ef408=_0x49fdd4[_0x2b03a4(0xb8)]||'',_0x5591ca={};{const _0x37e672=_0x2ef408[_0x2b03a4(0x143)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x37e672)for(const _0x3490ad of _0x37e672){_0x3490ad[_0x2b03a4(0x143)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x24bc63=String(RegExp['$1']),_0x4ea0b1=String(RegExp['$2']);VisuMZ[_0x2b03a4(0x12e)][_0x2b03a4(0x1e8)](_0x5591ca,_0x24bc63,_0x4ea0b1);}}if(_0x2ef408['match'](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x31f586=String(RegExp['$1'])[_0x2b03a4(0x105)](/[\r\n]+/)[_0x2b03a4(0xf4)]('');for(const _0x182c42 of _0x31f586){if(_0x182c42[_0x2b03a4(0x143)](/(.*)[ ]>>>[ ](.*)/i)){let _0x569be4=String(RegExp['$1']),_0x15e2ec=String(RegExp['$2']);VisuMZ[_0x2b03a4(0x12e)]['ParseSkillChangessIntoData'](_0x5591ca,_0x569be4,_0x15e2ec);}}}return this[_0x2b03a4(0x2a1)][_0x49fdd4['id']]=_0x5591ca,this[_0x2b03a4(0x2a1)][_0x49fdd4['id']];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1e8)]=function(_0x4af023,_0x27633e,_0x5c3484){const _0x4f47ef=_0x5a882d;/^\d+$/[_0x4f47ef(0x1c1)](_0x27633e)?_0x27633e=Number(_0x27633e):_0x27633e=DataManager['getSkillIdWithName'](_0x27633e),/^\d+$/[_0x4f47ef(0x1c1)](_0x5c3484)?_0x5c3484=Number(_0x5c3484):_0x5c3484=DataManager[_0x4f47ef(0xce)](_0x5c3484),_0x4af023[_0x27633e]=_0x5c3484;},DataManager[_0x5a882d(0x146)]=function(_0x52ced3){const _0x1c1099=_0x5a882d;if(!DataManager[_0x1c1099(0x2e7)](_0x52ced3))return![];this[_0x1c1099(0x218)]=this['_cache_isToggleSkill']||{};if(this[_0x1c1099(0x218)][_0x52ced3['id']]!==undefined)return this[_0x1c1099(0x218)][_0x52ced3['id']];this['_cache_isToggleSkill'][_0x52ced3['id']]=![];const _0xcefd1c=_0x52ced3[_0x1c1099(0xb8)]||'';if(_0xcefd1c[_0x1c1099(0x143)](/<TOGGLE>/i))this[_0x1c1099(0x218)][_0x52ced3['id']]=!![];else{if(_0xcefd1c[_0x1c1099(0x143)](/<INITIAL TOGGLE: ON>/i))this[_0x1c1099(0x218)][_0x52ced3['id']]=!![];else{if(_0xcefd1c['match'](/<INITIAL TOGGLE: OFF>/i))this[_0x1c1099(0x218)][_0x52ced3['id']]=!![];else _0xcefd1c[_0x1c1099(0x143)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this[_0x1c1099(0x218)][_0x52ced3['id']]=!![]);}}return this[_0x1c1099(0xda)](_0xcefd1c)&&(this[_0x1c1099(0x218)][_0x52ced3['id']]=![]),this[_0x1c1099(0x218)][_0x52ced3['id']];},DataManager[_0x5a882d(0xda)]=function(_0x2698fd){const _0x49f3bf=_0x5a882d;if(Imported['VisuMZ_3_ActiveChainSkills']){const _0x576c99=VisuMZ['ActiveChainSkills'][_0x49f3bf(0x2b2)];if(_0x2698fd[_0x49f3bf(0x143)](_0x576c99[_0x49f3bf(0x1bf)]))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x576c99['ForcedChainSkill']))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x576c99[_0x49f3bf(0x273)]))return!![];}if(Imported[_0x49f3bf(0x239)]){const _0x56c294=VisuMZ[_0x49f3bf(0x2be)][_0x49f3bf(0x2b2)];if(_0x2698fd['match'](_0x56c294['AvailableMatrix']))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x56c294[_0x49f3bf(0x115)]))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x56c294[_0x49f3bf(0x282)]))return!![];}if(Imported[_0x49f3bf(0x318)]){const _0x1e1559=VisuMZ[_0x49f3bf(0x361)][_0x49f3bf(0x2b2)];if(_0x2698fd[_0x49f3bf(0x143)](_0x1e1559['InputKey']))return!![];}if(Imported['VisuMZ_3_FieldSkills']){const _0x443583=VisuMZ[_0x49f3bf(0x23a)][_0x49f3bf(0x2b2)];if(_0x2698fd['match'](_0x443583[_0x49f3bf(0x28b)]))return!![];}if(Imported[_0x49f3bf(0x290)]){const _0x40f201=VisuMZ[_0x49f3bf(0x288)]['RegExp'];if(_0x2698fd[_0x49f3bf(0x143)](_0x40f201[_0x49f3bf(0x1c6)]))return!![];}if(Imported[_0x49f3bf(0x37e)]){const _0x2f96f0=VisuMZ[_0x49f3bf(0xc3)][_0x49f3bf(0x2b2)];if(_0x2698fd[_0x49f3bf(0x143)](_0x2f96f0[_0x49f3bf(0xc5)]))return!![];}if(Imported[_0x49f3bf(0x1ab)]){const _0x4861ff=VisuMZ[_0x49f3bf(0x2f8)]['RegExp'];if(_0x2698fd[_0x49f3bf(0x143)](_0x4861ff[_0x49f3bf(0x148)]))return!![];}if(Imported[_0x49f3bf(0xfa)]){const _0x101eb5=VisuMZ[_0x49f3bf(0xa7)][_0x49f3bf(0x2b2)];if(_0x2698fd['match'](_0x101eb5[_0x49f3bf(0x2e1)]))return!![];if(_0x2698fd['match'](_0x101eb5[_0x49f3bf(0x2e6)]))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x101eb5['ForceList']))return!![];if(_0x2698fd[_0x49f3bf(0x143)](_0x101eb5[_0x49f3bf(0x1bb)]))return!![];}return![];},DataManager['defaultToggleSkillSetting']=function(_0x36eebb){const _0x5e3716=_0x5a882d,_0x3421e7=_0x36eebb?_0x36eebb[_0x5e3716(0xb8)]||'':'';if(_0x3421e7[_0x5e3716(0x143)](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x3421e7[_0x5e3716(0x143)](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ['SkillsStatesCore'][_0x5e3716(0x79)][_0x5e3716(0x102)][_0x5e3716(0x1ea)];},DataManager[_0x5a882d(0x38c)]=function(_0x4343cd){const _0x38ffd5=_0x5a882d;if(!this[_0x38ffd5(0x2e7)](_0x4343cd))return[];this[_0x38ffd5(0x36a)]=this['_cache_toggleExclusionGroups']||{};if(this[_0x38ffd5(0x36a)][_0x4343cd['id']]!==undefined)return this[_0x38ffd5(0x36a)][_0x4343cd['id']];let _0x40a803=[];const _0x34563d=_0x4343cd[_0x38ffd5(0xb8)]||'';return _0x34563d[_0x38ffd5(0x143)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0x40a803=String(RegExp['$1'])[_0x38ffd5(0x105)](',')[_0x38ffd5(0x2b9)](_0x1775df=>_0x1775df['toUpperCase']()[_0x38ffd5(0x355)]())),this[_0x38ffd5(0x36a)][_0x4343cd['id']]=_0x40a803,this['_cache_toggleExclusionGroups'][_0x4343cd['id']];},TextManager[_0x5a882d(0x21a)]=VisuMZ['SkillsStatesCore'][_0x5a882d(0x79)][_0x5a882d(0x102)][_0x5a882d(0x2bb)]??_0x5a882d(0x2f9),TextManager[_0x5a882d(0x202)]=VisuMZ[_0x5a882d(0x12e)]['Settings'][_0x5a882d(0x102)]['ToggleOn']??'\x5cFS[22]\x5cC[0][ON]',TextManager[_0x5a882d(0x207)]=VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x79)]['Toggles'][_0x5a882d(0x1f4)]??_0x5a882d(0x180),TextManager[_0x5a882d(0xd7)]=VisuMZ[_0x5a882d(0x12e)]['Settings'][_0x5a882d(0x102)]['ToggleOffLocation']??_0x5a882d(0x192),ColorManager[_0x5a882d(0x2ad)]=function(_0x1f0b82,_0x137cf9){const _0x347a7c=_0x5a882d;return _0x137cf9=String(_0x137cf9),this[_0x347a7c(0x25a)]=this[_0x347a7c(0x25a)]||{},_0x137cf9[_0x347a7c(0x143)](/#(.*)/i)?this['_colorCache'][_0x1f0b82]='#%1'['format'](String(RegExp['$1'])):this[_0x347a7c(0x25a)][_0x1f0b82]=this[_0x347a7c(0xf2)](Number(_0x137cf9)),this[_0x347a7c(0x25a)][_0x1f0b82];},ColorManager[_0x5a882d(0x324)]=function(_0x2d5597){const _0x3b9a8d=_0x5a882d;return _0x2d5597=String(_0x2d5597),_0x2d5597[_0x3b9a8d(0x143)](/#(.*)/i)?_0x3b9a8d(0x2a5)[_0x3b9a8d(0x27c)](String(RegExp['$1'])):this[_0x3b9a8d(0xf2)](Number(_0x2d5597));},ColorManager[_0x5a882d(0x2da)]=function(_0x1fcb90){const _0x57222a=_0x5a882d;if(typeof _0x1fcb90===_0x57222a(0x321))_0x1fcb90=$dataStates[_0x1fcb90];const _0x45ad02=_0x57222a(0x2df)['format'](_0x1fcb90['id']);this[_0x57222a(0x25a)]=this[_0x57222a(0x25a)]||{};if(this['_colorCache'][_0x45ad02])return this[_0x57222a(0x25a)][_0x45ad02];const _0x373de4=this[_0x57222a(0x10d)](_0x1fcb90);return this[_0x57222a(0x2ad)](_0x45ad02,_0x373de4);},ColorManager['retrieveStateColor']=function(_0x5162ef){const _0xf546fa=_0x5a882d,_0x971ec5=_0x5162ef['note'];if(_0x971ec5[_0xf546fa(0x143)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x971ec5[_0xf546fa(0x143)](/<POSITIVE STATE>/i))return VisuMZ[_0xf546fa(0x12e)][_0xf546fa(0x79)][_0xf546fa(0x15c)]['ColorPositive'];else return _0x971ec5[_0xf546fa(0x143)](/<NEGATIVE STATE>/i)?VisuMZ[_0xf546fa(0x12e)]['Settings'][_0xf546fa(0x15c)][_0xf546fa(0x294)]:VisuMZ[_0xf546fa(0x12e)][_0xf546fa(0x79)][_0xf546fa(0x15c)][_0xf546fa(0x1fc)];}},ColorManager[_0x5a882d(0x2ec)]=function(){const _0xfd9461=_0x5a882d,_0x5b3d1f=_0xfd9461(0x2f2);this['_colorCache']=this[_0xfd9461(0x25a)]||{};if(this[_0xfd9461(0x25a)][_0x5b3d1f])return this[_0xfd9461(0x25a)][_0x5b3d1f];const _0x4e754a=VisuMZ[_0xfd9461(0x12e)][_0xfd9461(0x79)][_0xfd9461(0x25e)]['ColorBuff'];return this[_0xfd9461(0x2ad)](_0x5b3d1f,_0x4e754a);},ColorManager[_0x5a882d(0x230)]=function(){const _0x2434d7=_0x5a882d,_0x1aa778=_0x2434d7(0x252);this[_0x2434d7(0x25a)]=this[_0x2434d7(0x25a)]||{};if(this[_0x2434d7(0x25a)][_0x1aa778])return this[_0x2434d7(0x25a)][_0x1aa778];const _0x231643=VisuMZ[_0x2434d7(0x12e)]['Settings'][_0x2434d7(0x25e)][_0x2434d7(0x127)];return this['getColorDataFromPluginParameters'](_0x1aa778,_0x231643);},SceneManager['isSceneBattle']=function(){const _0x2c594f=_0x5a882d;return this[_0x2c594f(0x12d)]&&this[_0x2c594f(0x12d)][_0x2c594f(0x193)]===Scene_Battle;},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2c9)]=BattleManager['endAction'],BattleManager[_0x5a882d(0x176)]=function(){const _0x243711=_0x5a882d;this[_0x243711(0x25d)](),VisuMZ['SkillsStatesCore'][_0x243711(0x2c9)][_0x243711(0x1c3)](this);},BattleManager[_0x5a882d(0x25d)]=function(){const _0x21fd8d=_0x5a882d,_0x8f0f4=VisuMZ[_0x21fd8d(0x12e)][_0x21fd8d(0x79)][_0x21fd8d(0x15c)];if(!_0x8f0f4)return;if(_0x8f0f4[_0x21fd8d(0x12c)]===![])return;if(!this[_0x21fd8d(0xb3)])return;this[_0x21fd8d(0xb3)]['updateStatesActionEnd']();},Game_Battler[_0x5a882d(0x381)]['updateStatesActionEnd']=function(){const _0xec7ce=_0x5a882d;if(BattleManager[_0xec7ce(0x2e3)]!=='action')return;if(this[_0xec7ce(0x135)]===Graphics[_0xec7ce(0x31e)])return;this[_0xec7ce(0x135)]=Graphics['frameCount'];for(const _0x152706 of this[_0xec7ce(0x157)]){const _0x116483=$dataStates[_0x152706];if(!_0x116483)continue;if(_0x116483[_0xec7ce(0x1d9)]!==0x1)continue;this['_stateTurns'][_0x152706]>0x0&&this['_stateTurns'][_0x152706]--;}this['removeStatesAuto'](0x1);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x320)]=function(){const _0x183049=_0x5a882d,_0x51eb1e=VisuMZ[_0x183049(0x12e)]['Settings'][_0x183049(0x15c)];for(const _0x26a597 of this[_0x183049(0x157)]){const _0x4efddd=$dataStates[_0x26a597];if(_0x51eb1e&&_0x51eb1e[_0x183049(0x12c)]!==![]){if(_0x4efddd&&_0x4efddd[_0x183049(0x1d9)]===0x1)continue;}this[_0x183049(0x31c)][_0x26a597]>0x0&&this[_0x183049(0x31c)][_0x26a597]--;}},VisuMZ['SkillsStatesCore'][_0x5a882d(0x18c)]=Game_Switches[_0x5a882d(0x381)][_0x5a882d(0x94)],Game_Switches[_0x5a882d(0x381)][_0x5a882d(0x94)]=function(){const _0x4d54fd=_0x5a882d;VisuMZ[_0x4d54fd(0x12e)][_0x4d54fd(0x18c)]['call'](this);const _0x49905a=VisuMZ[_0x4d54fd(0x12e)][_0x4d54fd(0x79)][_0x4d54fd(0x23c)][_0x4d54fd(0x266)]??!![];if(!_0x49905a)return;if(SceneManager[_0x4d54fd(0x231)]())for(const _0xe80eac of BattleManager['allBattleMembers']()){if(_0xe80eac)_0xe80eac[_0x4d54fd(0x30d)]();}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x156)]=Game_Variables[_0x5a882d(0x381)][_0x5a882d(0x94)],Game_Variables[_0x5a882d(0x381)][_0x5a882d(0x94)]=function(){const _0x1552e3=_0x5a882d;VisuMZ[_0x1552e3(0x12e)]['Game_Variables_onChange'][_0x1552e3(0x1c3)](this);const _0x4541b5=VisuMZ[_0x1552e3(0x12e)][_0x1552e3(0x79)][_0x1552e3(0x23c)][_0x1552e3(0x2c8)]??!![];if(!_0x4541b5)return;if(SceneManager['isSceneBattle']())for(const _0x95cb44 of BattleManager['allBattleMembers']()){if(_0x95cb44)_0x95cb44[_0x1552e3(0x30d)]();}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x237)]=Game_Action[_0x5a882d(0x381)]['applyItemUserEffect'],Game_Action['prototype'][_0x5a882d(0x122)]=function(_0x25d811){const _0x5afd22=_0x5a882d;VisuMZ[_0x5afd22(0x12e)][_0x5afd22(0x237)][_0x5afd22(0x1c3)](this,_0x25d811),this[_0x5afd22(0x238)](_0x25d811);},Game_Action[_0x5a882d(0x381)][_0x5a882d(0x238)]=function(_0x1732e6){const _0x3df320=_0x5a882d;this[_0x3df320(0x109)](_0x1732e6),this[_0x3df320(0x15d)](_0x1732e6),this[_0x3df320(0x34d)](_0x1732e6),this[_0x3df320(0xf3)](_0x1732e6);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x280)]=Game_Action[_0x5a882d(0x381)][_0x5a882d(0x253)],Game_Action['prototype'][_0x5a882d(0x253)]=function(_0x5eb077){const _0x49b3f8=_0x5a882d;if(this[_0x49b3f8(0x1f6)](_0x5eb077))return!![];return VisuMZ[_0x49b3f8(0x12e)]['Game_Action_testApply'][_0x49b3f8(0x1c3)](this,_0x5eb077);},Game_Action[_0x5a882d(0x381)][_0x5a882d(0x1f6)]=function(_0x50fb65){const _0x23c8ea=_0x5a882d;if(!this[_0x23c8ea(0x16a)]())return;const _0x17e5d7=this['item']()['note'];if(_0x17e5d7['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x1ab700=String(RegExp['$1']);if(_0x50fb65[_0x23c8ea(0x35e)](_0x1ab700))return!![];}if(_0x17e5d7[_0x23c8ea(0x143)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0xc10318=Number(RegExp['$1']);if(_0x50fb65['isStateAffected'](_0xc10318))return!![];}else{if(_0x17e5d7[_0x23c8ea(0x143)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x3dd517=DataManager[_0x23c8ea(0x119)](RegExp['$1']);if(_0x50fb65['isStateAffected'](_0x3dd517))return!![];}}return![];},Game_Action[_0x5a882d(0x381)][_0x5a882d(0x109)]=function(_0xb72acb){const _0x45095e=_0x5a882d;if(_0xb72acb[_0x45095e(0x292)]()[_0x45095e(0x36d)]<=0x0)return;const _0x3e41f2=this['item']()[_0x45095e(0xb8)];{const _0x518fbd=_0x3e41f2[_0x45095e(0x143)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x518fbd)for(const _0x28d52b of _0x518fbd){_0x28d52b[_0x45095e(0x143)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x20b2d9=String(RegExp['$1']);_0xb72acb[_0x45095e(0xa8)](_0x20b2d9);}}{const _0x22fdbb=_0x3e41f2['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x22fdbb)for(const _0x26bcc7 of _0x22fdbb){_0x26bcc7[_0x45095e(0x143)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x67ea1a=String(RegExp['$1']),_0x2199a4=Number(RegExp['$2']);_0xb72acb[_0x45095e(0x17f)](_0x67ea1a,_0x2199a4);}}},Game_Action[_0x5a882d(0x381)]['applyStateTurnManipulationEffects']=function(_0x340434){const _0x1cb83a=_0x5a882d,_0x3c40b5=this[_0x1cb83a(0x16a)]()[_0x1cb83a(0xb8)],_0x22d4ae=_0x3c40b5[_0x1cb83a(0x143)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x22d4ae)for(const _0x526edd of _0x22d4ae){let _0x55076a=0x0,_0x4e53b8=0x0;if(_0x526edd[_0x1cb83a(0x143)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x55076a=Number(RegExp['$1']),_0x4e53b8=Number(RegExp['$2']);else _0x526edd[_0x1cb83a(0x143)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x55076a=DataManager[_0x1cb83a(0x119)](RegExp['$1']),_0x4e53b8=Number(RegExp['$2']));_0x340434[_0x1cb83a(0x88)](_0x55076a,_0x4e53b8),this[_0x1cb83a(0xff)](_0x340434);}const _0x451b3b=_0x3c40b5['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x451b3b)for(const _0x929653 of _0x451b3b){let _0x810af7=0x0,_0x5cc1ac=0x0;if(_0x929653[_0x1cb83a(0x143)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x810af7=Number(RegExp['$1']),_0x5cc1ac=Number(RegExp['$2']);else _0x929653[_0x1cb83a(0x143)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x810af7=DataManager[_0x1cb83a(0x119)](RegExp['$1']),_0x5cc1ac=Number(RegExp['$2']));_0x340434[_0x1cb83a(0x28f)](_0x810af7,_0x5cc1ac),this[_0x1cb83a(0xff)](_0x340434);}},Game_Action[_0x5a882d(0x381)][_0x5a882d(0x34d)]=function(_0x5e3235){const _0xd09baa=_0x5a882d,_0x200147=[_0xd09baa(0x194),'MAXMP',_0xd09baa(0x285),_0xd09baa(0x2ae),'MAT',_0xd09baa(0x1b9),_0xd09baa(0x1de),'LUK'],_0x2d1f5f=this[_0xd09baa(0x16a)]()['note'],_0xf3489c=_0x2d1f5f[_0xd09baa(0x143)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0xf3489c)for(const _0x413830 of _0xf3489c){_0x413830['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x3e9f98=_0x200147[_0xd09baa(0x22d)](String(RegExp['$1'])[_0xd09baa(0x270)]()),_0x22f4ba=Number(RegExp['$2']);_0x3e9f98>=0x0&&(_0x5e3235[_0xd09baa(0x169)](_0x3e9f98,_0x22f4ba),this[_0xd09baa(0xff)](_0x5e3235));}const _0x3580ec=_0x2d1f5f['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3580ec)for(const _0x5bfd3b of _0x3580ec){_0x5bfd3b[_0xd09baa(0x143)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x2025e4=_0x200147[_0xd09baa(0x22d)](String(RegExp['$1'])['toUpperCase']()),_0x5bd6f3=Number(RegExp['$2']);_0x2025e4>=0x0&&(_0x5e3235[_0xd09baa(0x2d8)](_0x2025e4,_0x5bd6f3),this[_0xd09baa(0xff)](_0x5e3235));}},Game_Action['prototype'][_0x5a882d(0xf3)]=function(_0x53136d){const _0x20bea5=_0x5a882d,_0x412e85=[_0x20bea5(0x194),_0x20bea5(0x183),_0x20bea5(0x285),_0x20bea5(0x2ae),_0x20bea5(0x150),'MDF','AGI',_0x20bea5(0x305)],_0x2d6675=this[_0x20bea5(0x16a)]()[_0x20bea5(0xb8)],_0x49a97e=_0x2d6675[_0x20bea5(0x143)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x49a97e)for(const _0x1fc6b9 of _0x49a97e){_0x1fc6b9[_0x20bea5(0x143)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x874466=_0x412e85[_0x20bea5(0x22d)](String(RegExp['$1'])['toUpperCase']()),_0x327be3=Number(RegExp['$2']);_0x874466>=0x0&&(_0x53136d[_0x20bea5(0xbf)](_0x874466,_0x327be3),this['makeSuccess'](_0x53136d));}const _0x1f31fa=_0x2d6675[_0x20bea5(0x143)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1f31fa)for(const _0x2ee578 of _0x1f31fa){_0x2ee578[_0x20bea5(0x143)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1ac690=_0x412e85[_0x20bea5(0x22d)](String(RegExp['$1'])['toUpperCase']()),_0x307693=Number(RegExp['$2']);_0x1ac690>=0x0&&(_0x53136d[_0x20bea5(0x354)](_0x1ac690,_0x307693),this['makeSuccess'](_0x53136d));}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x32f)]=Game_BattlerBase['prototype'][_0x5a882d(0x2e9)],Game_BattlerBase['prototype'][_0x5a882d(0x2e9)]=function(){const _0x27621d=_0x5a882d;this[_0x27621d(0x182)]={},this[_0x27621d(0x1c9)](),VisuMZ[_0x27621d(0x12e)][_0x27621d(0x32f)]['call'](this);},Game_BattlerBase[_0x5a882d(0x381)]['initMembersSkillsStatesCore']=function(){const _0x4c3c96=_0x5a882d;this['_stateRetainType']='',this[_0x4c3c96(0xd6)]={},this[_0x4c3c96(0x37b)]={},this['_stateOrigin']={},this[_0x4c3c96(0x306)]={};},Game_BattlerBase[_0x5a882d(0x381)]['checkCacheKey']=function(_0x3ee504){const _0x17cb21=_0x5a882d;return this[_0x17cb21(0x182)]=this[_0x17cb21(0x182)]||{},this['_cache'][_0x3ee504]!==undefined;},VisuMZ[_0x5a882d(0x12e)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x5a882d(0x381)]['refresh'],Game_BattlerBase['prototype'][_0x5a882d(0x30d)]=function(){const _0x5e7409=_0x5a882d;this[_0x5e7409(0x182)]={},VisuMZ[_0x5e7409(0x12e)][_0x5e7409(0x346)][_0x5e7409(0x1c3)](this);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xae)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x245)],Game_BattlerBase[_0x5a882d(0x381)]['eraseState']=function(_0x1d844f){const _0x522b8a=_0x5a882d;let _0x3c6d3c=this['isStateAffected'](_0x1d844f);VisuMZ[_0x522b8a(0x12e)][_0x522b8a(0xae)][_0x522b8a(0x1c3)](this,_0x1d844f);if(_0x3c6d3c&&!this[_0x522b8a(0x18e)](_0x1d844f))this[_0x522b8a(0xa3)](_0x1d844f);},Game_BattlerBase[_0x5a882d(0x381)]['onRemoveState']=function(_0x5df24a){const _0x353362=_0x5a882d;this[_0x353362(0x21b)](_0x5df24a),this['clearStateDisplay'](_0x5df24a);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xfb)]=Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x19e)],Game_Battler['prototype'][_0x5a882d(0x19e)]=function(){const _0x78638a=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x78638a(0xfb)][_0x78638a(0x1c3)](this),this[_0x78638a(0x376)](),this[_0x78638a(0x26d)]=0x0,this[_0x78638a(0x1b4)]=0x0;},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x103)]=Game_BattlerBase[_0x5a882d(0x381)]['resetStateCounts'],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x7f)]=function(_0x541e45){const _0x30c3e9=_0x5a882d,_0x266056=$dataStates[_0x541e45],_0x21c6e0=this[_0x30c3e9(0x19d)](_0x541e45),_0x4c87d4=this[_0x30c3e9(0x388)](_0x266056)[_0x30c3e9(0x132)]()[_0x30c3e9(0x355)]();switch(_0x4c87d4){case _0x30c3e9(0x11d):if(_0x21c6e0<=0x0)this['prepareResetStateCounts'](_0x541e45);break;case _0x30c3e9(0x1dd):this[_0x30c3e9(0x211)](_0x541e45);break;case _0x30c3e9(0x310):this[_0x30c3e9(0x211)](_0x541e45),this[_0x30c3e9(0x31c)][_0x541e45]=Math[_0x30c3e9(0x27a)](this[_0x30c3e9(0x31c)][_0x541e45],_0x21c6e0);break;case _0x30c3e9(0x22b):this['prepareResetStateCounts'](_0x541e45),this[_0x30c3e9(0x31c)][_0x541e45]+=_0x21c6e0;break;default:this[_0x30c3e9(0x211)](_0x541e45);break;}if(this[_0x30c3e9(0x18e)](_0x541e45)){const _0x42eab1=DataManager['stateMaximumTurns'](_0x541e45);this[_0x30c3e9(0x31c)][_0x541e45]=this[_0x30c3e9(0x31c)][_0x541e45]['clamp'](0x0,_0x42eab1);}},Game_BattlerBase['prototype'][_0x5a882d(0x211)]=function(_0x1dcf67){const _0x1c5c46=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x1c5c46(0x103)]['call'](this,_0x1dcf67);},Game_BattlerBase[_0x5a882d(0x381)]['getStateReapplyRulings']=function(_0xf740a2){const _0x5bd3f2=_0x5a882d,_0x2c20ea=_0xf740a2[_0x5bd3f2(0xb8)];return _0x2c20ea[_0x5bd3f2(0x143)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x5bd3f2(0x12e)][_0x5bd3f2(0x79)][_0x5bd3f2(0x15c)][_0x5bd3f2(0x113)];},VisuMZ[_0x5a882d(0x12e)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x226)],Game_BattlerBase[_0x5a882d(0x381)]['overwriteBuffTurns']=function(_0x5f2b5a,_0x5e40af){const _0x2a0538=_0x5a882d,_0x5e38c9=VisuMZ[_0x2a0538(0x12e)][_0x2a0538(0x79)][_0x2a0538(0x25e)][_0x2a0538(0x113)],_0x16ca33=this[_0x2a0538(0x1b3)](_0x5f2b5a);switch(_0x5e38c9){case _0x2a0538(0x11d):if(_0x16ca33<=0x0)this[_0x2a0538(0x128)][_0x5f2b5a]=_0x5e40af;break;case _0x2a0538(0x1dd):this[_0x2a0538(0x128)][_0x5f2b5a]=_0x5e40af;break;case'greater':this[_0x2a0538(0x128)][_0x5f2b5a]=Math[_0x2a0538(0x27a)](_0x16ca33,_0x5e40af);break;case _0x2a0538(0x22b):this[_0x2a0538(0x128)][_0x5f2b5a]+=_0x5e40af;break;default:VisuMZ[_0x2a0538(0x12e)][_0x2a0538(0x37f)][_0x2a0538(0x1c3)](this,_0x5f2b5a,_0x5e40af);break;}const _0x4d2a3f=VisuMZ[_0x2a0538(0x12e)][_0x2a0538(0x79)][_0x2a0538(0x25e)]['MaxTurns'];this[_0x2a0538(0x128)][_0x5f2b5a]=this[_0x2a0538(0x128)][_0x5f2b5a]['clamp'](0x0,_0x4d2a3f);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x99)]=function(){const _0x16f236=_0x5a882d;if(this[_0x16f236(0x182)]['groupDefeat']!==undefined)return this[_0x16f236(0x182)][_0x16f236(0x328)];this[_0x16f236(0x182)]['groupDefeat']=![];const _0x47cec2=this[_0x16f236(0x292)]();for(const _0x270525 of _0x47cec2){if(!_0x270525)continue;if(_0x270525[_0x16f236(0xb8)]['match'](/<GROUP DEFEAT>/i)){this['_cache'][_0x16f236(0x328)]=!![];break;}}return this['_cache'][_0x16f236(0x328)];},VisuMZ[_0x5a882d(0x12e)]['Game_Unit_deadMembers']=Game_Unit[_0x5a882d(0x381)]['deadMembers'],Game_Unit[_0x5a882d(0x381)][_0x5a882d(0xb6)]=function(){const _0x491150=_0x5a882d;let _0x3a7237=VisuMZ[_0x491150(0x12e)][_0x491150(0x221)]['call'](this);return BattleManager[_0x491150(0x352)]&&(_0x3a7237=_0x3a7237['concat'](this['members']()[_0x491150(0x264)](_0x44e1d0=>_0x44e1d0[_0x491150(0x99)]()))),_0x3a7237;},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x20f)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x38e)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x38e)]=function(){const _0x2be6bc=_0x5a882d;this['getStateRetainType']()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0x2be6bc(0x12e)][_0x2be6bc(0x20f)][_0x2be6bc(0x1c3)](this),this['initMembersSkillsStatesCore']());},Game_Actor['prototype'][_0x5a882d(0x38e)]=function(){const _0x271c74=_0x5a882d;this[_0x271c74(0x21d)]=this[_0x271c74(0x21d)]||{},Game_Battler[_0x271c74(0x381)]['clearStates'][_0x271c74(0x1c3)](this);},Game_BattlerBase['prototype'][_0x5a882d(0x1e0)]=function(){const _0x1fcb84=_0x5a882d,_0x65631c=this['states']();for(const _0x99d818 of _0x65631c){if(_0x99d818&&this['canClearState'](_0x99d818))this[_0x1fcb84(0x245)](_0x99d818['id']);}this[_0x1fcb84(0x182)]={};},Game_BattlerBase[_0x5a882d(0x381)]['canClearState']=function(_0x46ceb8){const _0x27ddd6=_0x5a882d,_0xa9f8b5=this['getStateRetainType']();if(_0xa9f8b5!==''){const _0xfb8def=_0x46ceb8[_0x27ddd6(0xb8)];if(_0xa9f8b5===_0x27ddd6(0x9b)&&_0xfb8def[_0x27ddd6(0x143)](/<NO DEATH CLEAR>/i))return![];if(_0xa9f8b5===_0x27ddd6(0x2aa)&&_0xfb8def[_0x27ddd6(0x143)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x27ddd6(0x18e)](_0x46ceb8['id']);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x188)]=function(){const _0x55ab87=_0x5a882d;return this[_0x55ab87(0xba)];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x2bc)]=function(_0x2bcc1a){const _0x3017fb=_0x5a882d;this[_0x3017fb(0xba)]=_0x2bcc1a;},Game_BattlerBase[_0x5a882d(0x381)]['clearStateRetainType']=function(){const _0x2f0b79=_0x5a882d;this[_0x2f0b79(0xba)]='';},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2e4)]=Game_BattlerBase['prototype'][_0x5a882d(0x30b)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x30b)]=function(){const _0x583854=_0x5a882d;this[_0x583854(0x2bc)](_0x583854(0x9b)),VisuMZ[_0x583854(0x12e)][_0x583854(0x2e4)][_0x583854(0x1c3)](this),this[_0x583854(0x30c)]();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x10e)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x378)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x378)]=function(){const _0x20409a=_0x5a882d;this['setStateRetainType'](_0x20409a(0x2aa)),VisuMZ[_0x20409a(0x12e)][_0x20409a(0x10e)][_0x20409a(0x1c3)](this),this[_0x20409a(0x30c)]();},Game_BattlerBase[_0x5a882d(0x381)]['adjustSkillCost']=function(_0x449073,_0x21610a,_0x599c63){return _0x21610a;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x17a)]=function(_0x31b7ba){const _0x4d1d1e=_0x5a882d;for(settings of VisuMZ['SkillsStatesCore'][_0x4d1d1e(0x79)][_0x4d1d1e(0x154)]){let _0x207417=settings[_0x4d1d1e(0x248)][_0x4d1d1e(0x1c3)](this,_0x31b7ba);_0x207417=this[_0x4d1d1e(0x278)](_0x31b7ba,_0x207417,settings);if(!settings['CanPayJS'][_0x4d1d1e(0x1c3)](this,_0x31b7ba,_0x207417))return![];}return!![];},Game_BattlerBase['prototype'][_0x5a882d(0x311)]=function(_0x25c8c3){const _0x44a5c0=_0x5a882d;for(settings of VisuMZ[_0x44a5c0(0x12e)][_0x44a5c0(0x79)]['Costs']){let _0xaa369c=settings['CalcJS'][_0x44a5c0(0x1c3)](this,_0x25c8c3);_0xaa369c=this[_0x44a5c0(0x278)](_0x25c8c3,_0xaa369c,settings),settings['PayJS'][_0x44a5c0(0x1c3)](this,_0x25c8c3,_0xaa369c);}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2bd)]=Game_BattlerBase[_0x5a882d(0x381)]['meetsSkillConditions'],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x2fe)]=function(_0x352471){const _0x4fbba4=_0x5a882d;if(!_0x352471)return![];if(!VisuMZ[_0x4fbba4(0x12e)][_0x4fbba4(0x2bd)]['call'](this,_0x352471))return![];if(!this[_0x4fbba4(0x375)](_0x352471))return![];if(!this[_0x4fbba4(0x170)](_0x352471))return![];if(!this[_0x4fbba4(0x255)](_0x352471))return![];return!![];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x375)]=function(_0x2f3540){const _0x35f9dd=_0x5a882d;if(!this[_0x35f9dd(0x1fb)](_0x2f3540))return![];return!![];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1fb)]=function(_0xe0644c){const _0x4cfae0=_0x5a882d,_0x376966=_0xe0644c['note'];if(_0x376966[_0x4cfae0(0x143)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1ed874=JSON[_0x4cfae0(0x189)]('['+RegExp['$1'][_0x4cfae0(0x143)](/\d+/g)+']');for(const _0x4679d5 of _0x1ed874){if(!$gameSwitches[_0x4cfae0(0x220)](_0x4679d5))return![];}return!![];}if(_0x376966[_0x4cfae0(0x143)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5b6df9=JSON['parse']('['+RegExp['$1'][_0x4cfae0(0x143)](/\d+/g)+']');for(const _0x578459 of _0x5b6df9){if(!$gameSwitches['value'](_0x578459))return![];}return!![];}if(_0x376966['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e3e3c=JSON[_0x4cfae0(0x189)]('['+RegExp['$1'][_0x4cfae0(0x143)](/\d+/g)+']');for(const _0x40f2ca of _0x2e3e3c){if($gameSwitches[_0x4cfae0(0x220)](_0x40f2ca))return!![];}return![];}if(_0x376966[_0x4cfae0(0x143)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x644c3e=JSON[_0x4cfae0(0x189)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x131fb0 of _0x644c3e){if(!$gameSwitches[_0x4cfae0(0x220)](_0x131fb0))return!![];}return![];}if(_0x376966[_0x4cfae0(0x143)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x29026e=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5685ab of _0x29026e){if(!$gameSwitches['value'](_0x5685ab))return!![];}return![];}if(_0x376966['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d7cec=JSON[_0x4cfae0(0x189)]('['+RegExp['$1'][_0x4cfae0(0x143)](/\d+/g)+']');for(const _0x8ef903 of _0x3d7cec){if($gameSwitches[_0x4cfae0(0x220)](_0x8ef903))return![];}return!![];}return!![];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x170)]=function(_0x198899){const _0xecfde3=_0x5a882d,_0x293fda=_0x198899[_0xecfde3(0xb8)],_0x1b86a0=VisuMZ[_0xecfde3(0x12e)][_0xecfde3(0x2ee)];return _0x1b86a0[_0x198899['id']]?_0x1b86a0[_0x198899['id']][_0xecfde3(0x1c3)](this,_0x198899):!![];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x255)]=function(_0x2c88ec){const _0x4de9ea=_0x5a882d;return VisuMZ[_0x4de9ea(0x12e)]['Settings'][_0x4de9ea(0x37d)][_0x4de9ea(0x96)][_0x4de9ea(0x1c3)](this,_0x2c88ec);},VisuMZ['SkillsStatesCore'][_0x5a882d(0x14e)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0xf5)],Game_BattlerBase['prototype']['skillMpCost']=function(_0x52f323){const _0x5546b7=_0x5a882d;for(settings of VisuMZ[_0x5546b7(0x12e)][_0x5546b7(0x79)][_0x5546b7(0x154)]){if(settings[_0x5546b7(0x216)]['toUpperCase']()==='MP'){let _0xbe5644=settings[_0x5546b7(0x248)][_0x5546b7(0x1c3)](this,_0x52f323);return _0xbe5644=this[_0x5546b7(0x278)](_0x52f323,_0xbe5644,settings),_0xbe5644;}}return VisuMZ[_0x5546b7(0x12e)][_0x5546b7(0x14e)][_0x5546b7(0x1c3)](this,_0x52f323);},VisuMZ[_0x5a882d(0x12e)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase['prototype'][_0x5a882d(0x8e)],Game_BattlerBase['prototype'][_0x5a882d(0x8e)]=function(_0x2fe893){const _0x54e75a=_0x5a882d;for(settings of VisuMZ[_0x54e75a(0x12e)]['Settings']['Costs']){if(settings[_0x54e75a(0x216)]['toUpperCase']()==='TP'){let _0x3e4a1c=settings[_0x54e75a(0x248)][_0x54e75a(0x1c3)](this,_0x2fe893);return _0x3e4a1c=this[_0x54e75a(0x278)](_0x2fe893,_0x3e4a1c,settings),_0x3e4a1c;}}return VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillTpCost'][_0x54e75a(0x1c3)](this,_0x2fe893);},Game_BattlerBase[_0x5a882d(0x381)]['hasState']=function(_0x54b853){const _0xf3cc79=_0x5a882d;if(typeof _0x54b853===_0xf3cc79(0x321))_0x54b853=$dataStates[_0x54b853];return this[_0xf3cc79(0x292)]()[_0xf3cc79(0x129)](_0x54b853);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xa9)]=Game_BattlerBase[_0x5a882d(0x381)]['states'],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x292)]=function(){const _0x407a42=_0x5a882d;let _0x5ab3c8=VisuMZ['SkillsStatesCore']['Game_BattlerBase_states'][_0x407a42(0x1c3)](this);if($gameTemp[_0x407a42(0xc4)])return _0x5ab3c8;return $gameTemp[_0x407a42(0xc4)]=!![],this[_0x407a42(0x81)](_0x5ab3c8),$gameTemp['_checkingPassiveStates']=undefined,_0x5ab3c8;},Game_BattlerBase['prototype'][_0x5a882d(0x81)]=function(_0x5d71e2){const _0x1fab45=_0x5a882d,_0x2334e4=this['passiveStates']();for(state of _0x2334e4){if(!state)continue;if(!this[_0x1fab45(0x149)](state)&&_0x5d71e2[_0x1fab45(0x129)](state))continue;_0x5d71e2[_0x1fab45(0x2d1)](state);}_0x2334e4[_0x1fab45(0x36d)]>0x0&&_0x5d71e2[_0x1fab45(0x121)]((_0x2832c9,_0xba682d)=>{const _0x2a41d8=_0x2832c9['priority'],_0x347b7e=_0xba682d['priority'];if(_0x2a41d8!==_0x347b7e)return _0x347b7e-_0x2a41d8;return _0x2832c9-_0xba682d;});},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x149)]=function(_0x2447fa){const _0x347653=_0x5a882d;return _0x2447fa[_0x347653(0xb8)][_0x347653(0x143)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x5a882d(0x12e)]['Game_BattlerBase_traitsSet']=Game_BattlerBase['prototype'][_0x5a882d(0x26e)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x26e)]=function(_0x4270f9){const _0x52590b=_0x5a882d;this[_0x52590b(0x139)]=!![];let _0x5779a4=VisuMZ['SkillsStatesCore'][_0x52590b(0x1b0)][_0x52590b(0x1c3)](this,_0x4270f9);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x5779a4;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1ba)]=function(){const _0x25a5c3=_0x5a882d;let _0x27f946=[];this[_0x25a5c3(0x20a)]=this['_passiveStateResults']||{};for(;;){_0x27f946=[];let _0xb89603=!![];for(const _0x3ce455 of this['_cache'][_0x25a5c3(0x377)]){const _0x355b29=$dataStates[_0x3ce455];if(!_0x355b29)continue;let _0x24627d=this[_0x25a5c3(0x319)](_0x355b29);this[_0x25a5c3(0x20a)][_0x3ce455]!==_0x24627d&&(_0xb89603=![],this[_0x25a5c3(0x20a)][_0x3ce455]=_0x24627d);if(!_0x24627d)continue;_0x27f946[_0x25a5c3(0x2d1)](_0x355b29);}if(_0xb89603)break;else{if(!this[_0x25a5c3(0x139)])this[_0x25a5c3(0x30d)]();this[_0x25a5c3(0x360)]();}}return _0x27f946;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x319)]=function(_0x33a414){const _0x59955a=_0x5a882d;if(!this['meetsPassiveStateConditionClasses'](_0x33a414))return![];if(!this[_0x59955a(0x1ac)](_0x33a414))return![];if(!this['meetsPassiveStateConditionJS'](_0x33a414))return![];if(!this[_0x59955a(0x27f)](_0x33a414))return![];return!![];},Game_BattlerBase['prototype'][_0x5a882d(0x1a4)]=function(_0xa66502){return!![];},Game_Actor['prototype'][_0x5a882d(0x1a4)]=function(_0x38cf25){const _0x484b2a=_0x5a882d,_0x474c2d=DataManager['getPassiveStateConditionClassesData'](_0x38cf25);if(_0x474c2d[_0x484b2a(0xd9)][_0x484b2a(0x36d)]>0x0){const _0x3fff5f=_0x474c2d[_0x484b2a(0xd9)];if(!_0x3fff5f[_0x484b2a(0x129)](this[_0x484b2a(0xd9)]()))return![];}if(_0x474c2d[_0x484b2a(0x2a2)][_0x484b2a(0x36d)]>0x0){const _0x1739e8=_0x474c2d['multiClass'];let _0x59e49f=[this[_0x484b2a(0xd9)]()];Imported[_0x484b2a(0x371)]&&this[_0x484b2a(0x222)]&&(_0x59e49f=this[_0x484b2a(0x222)]());if(_0x1739e8[_0x484b2a(0x264)](_0x52302c=>_0x59e49f[_0x484b2a(0x129)](_0x52302c))['length']<=0x0)return![];}return Game_BattlerBase[_0x484b2a(0x381)][_0x484b2a(0x1a4)]['call'](this,_0x38cf25);},DataManager['getPassiveStateConditionClassesData']=function(_0x2657a2){const _0x1823ae=_0x5a882d,_0x3d298a={'currentClass':[],'multiClass':[]};if(!_0x2657a2)return _0x3d298a;this['_cache_getPassiveStateConditionClassesData']=this[_0x1823ae(0x196)]||{};if(this[_0x1823ae(0x196)][_0x2657a2['id']]!==undefined)return this[_0x1823ae(0x196)][_0x2657a2['id']];const _0x17553d=_0x2657a2[_0x1823ae(0xb8)]||'';if(_0x17553d['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1a30e8=String(RegExp['$1'])['split'](',')[_0x1823ae(0x2b9)](_0x537664=>_0x537664[_0x1823ae(0x355)]());_0x3d298a[_0x1823ae(0xd9)]=VisuMZ['SkillsStatesCore'][_0x1823ae(0xa1)](_0x1a30e8);}if(_0x17553d[_0x1823ae(0x143)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x2cc655=String(RegExp['$1'])[_0x1823ae(0x105)](',')[_0x1823ae(0x2b9)](_0x156377=>_0x156377[_0x1823ae(0x355)]());_0x3d298a[_0x1823ae(0x2a2)]=VisuMZ[_0x1823ae(0x12e)]['ParseClassIDs'](_0x2cc655);}return this[_0x1823ae(0x196)][_0x2657a2['id']]=_0x3d298a,this['_cache_getPassiveStateConditionClassesData'][_0x2657a2['id']];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xa1)]=function(_0x3c44f3){const _0x2169f5=_0x5a882d,_0x24b7dd=[];for(let _0x59eb3c of _0x3c44f3){_0x59eb3c=(String(_0x59eb3c)||'')[_0x2169f5(0x355)]();const _0x548582=/^\d+$/['test'](_0x59eb3c);_0x548582?_0x24b7dd[_0x2169f5(0x2d1)](Number(_0x59eb3c)):_0x24b7dd[_0x2169f5(0x2d1)](DataManager[_0x2169f5(0x272)](_0x59eb3c));}return _0x24b7dd[_0x2169f5(0x2b9)](_0x35df3f=>$dataClasses[Number(_0x35df3f)])[_0x2169f5(0xf4)](null);},Game_BattlerBase[_0x5a882d(0x381)]['meetsPassiveStateConditionSwitches']=function(_0x2cc9d1){const _0x46e00e=_0x5a882d,_0x1ae686=DataManager['getPassiveStateConditionSwitchData'](_0x2cc9d1);if(_0x1ae686[_0x46e00e(0x1ef)]&&_0x1ae686['allSwitchOn'][_0x46e00e(0x36d)]>0x0){const _0x2b5a65=_0x1ae686[_0x46e00e(0x1ef)];for(const _0x540d0e of _0x2b5a65){if(!$gameSwitches['value'](_0x540d0e))return![];}}if(_0x1ae686['anySwitchOn']&&_0x1ae686['anySwitchOn'][_0x46e00e(0x36d)]>0x0){const _0x1249c2=_0x1ae686['anySwitchOn'];let _0x370fe1=!![];for(const _0x2232fe of _0x1249c2){if($gameSwitches[_0x46e00e(0x220)](_0x2232fe)){_0x370fe1=![];break;}}if(_0x370fe1)return![];}if(_0x1ae686[_0x46e00e(0x303)]&&_0x1ae686[_0x46e00e(0x303)][_0x46e00e(0x36d)]>0x0){const _0x1c091a=_0x1ae686[_0x46e00e(0x303)];for(const _0xd6e1a8 of _0x1c091a){if($gameSwitches[_0x46e00e(0x220)](_0xd6e1a8))return![];}}if(_0x1ae686[_0x46e00e(0x29d)]&&_0x1ae686['anySwitchOff']['length']>0x0){const _0x1f2eac=_0x1ae686['anySwitchOff'];let _0x628e1=!![];for(const _0x131696 of _0x1f2eac){if(!$gameSwitches[_0x46e00e(0x220)](_0x131696)){_0x628e1=![];break;}}if(_0x628e1)return![];}return!![];},DataManager['getPassiveStateConditionSwitchData']=function(_0x31c21e){const _0x30b679=_0x5a882d;let _0x60d8f8={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x31c21e)return _0x60d8f8;const _0x28ceab=_0x31c21e['id'];this[_0x30b679(0x23d)]=this[_0x30b679(0x23d)]||{};if(this['_cache_getPassiveStateConditionSwitchData'][_0x28ceab]!==undefined)return this['_cache_getPassiveStateConditionSwitchData'][_0x28ceab];const _0x40115e=_0x31c21e[_0x30b679(0xb8)]||'';return _0x40115e['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x60d8f8[_0x30b679(0x1ef)]=String(RegExp['$1'])['split'](',')['map'](_0x1d38b8=>Number(_0x1d38b8)),console[_0x30b679(0x256)](_0x60d8f8)),_0x40115e['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x60d8f8[_0x30b679(0x257)]=String(RegExp['$1'])[_0x30b679(0x105)](',')[_0x30b679(0x2b9)](_0x29c027=>Number(_0x29c027))),_0x40115e['match'](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x60d8f8[_0x30b679(0x303)]=String(RegExp['$1'])['split'](',')[_0x30b679(0x2b9)](_0x2a5a5d=>Number(_0x2a5a5d))),_0x40115e[_0x30b679(0x143)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x60d8f8[_0x30b679(0x29d)]=String(RegExp['$1'])[_0x30b679(0x105)](',')[_0x30b679(0x2b9)](_0x334677=>Number(_0x334677))),this[_0x30b679(0x23d)][_0x28ceab]=_0x60d8f8,this[_0x30b679(0x23d)][_0x28ceab];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0xf9)]=function(_0x2e609e){const _0x452888=_0x5a882d,_0x3ee944=VisuMZ[_0x452888(0x12e)]['statePassiveConditionJS'];if(_0x3ee944[_0x2e609e['id']]){this[_0x452888(0x26d)]=this[_0x452888(0x26d)]||0x0,this[_0x452888(0x1b4)]=this[_0x452888(0x1b4)]||0x0;this['_prevPassiveJsFrameCount']!==Graphics[_0x452888(0x31e)]&&(this[_0x452888(0x26d)]=Graphics[_0x452888(0x31e)],this[_0x452888(0x236)]={},this[_0x452888(0x1b4)]=0x0);this[_0x452888(0x1b4)]++;if(this['_prevPassiveJsCounter']>=0x1e)return this[_0x452888(0x236)][_0x2e609e['id']]??!![];else{const _0x5be2e8=_0x3ee944[_0x2e609e['id']][_0x452888(0x1c3)](this,_0x2e609e);return this[_0x452888(0x236)][_0x2e609e['id']]=_0x5be2e8,_0x5be2e8;}}else return!![];},Game_BattlerBase['prototype'][_0x5a882d(0x27f)]=function(_0x5b12ae){const _0x3ae187=_0x5a882d;return VisuMZ[_0x3ae187(0x12e)]['Settings'][_0x3ae187(0x23c)]['PassiveConditionJS'][_0x3ae187(0x1c3)](this,_0x5b12ae);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x377)]=function(){const _0x4a6230=_0x5a882d;if(this['checkCacheKey']('passiveStates'))return this[_0x4a6230(0x1ba)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this[_0x4a6230(0x360)](),this[_0x4a6230(0x326)]=undefined,this[_0x4a6230(0x1ba)]();},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x360)]=function(){const _0x3ac26c=_0x5a882d;this[_0x3ac26c(0x326)]=!![],this[_0x3ac26c(0x182)][_0x3ac26c(0x377)]=[],this[_0x3ac26c(0x36e)](),this['addPassiveStatesByNotetag'](),this[_0x3ac26c(0x2c5)](),Game_BattlerBase[_0x3ac26c(0x167)]&&this[_0x3ac26c(0x16f)](),this[_0x3ac26c(0x182)]['passiveStates']=this[_0x3ac26c(0x182)][_0x3ac26c(0x377)][_0x3ac26c(0x121)]((_0x5760c5,_0x2d8644)=>_0x5760c5-_0x2d8644),this[_0x3ac26c(0x326)]=undefined;},Game_BattlerBase['prototype']['addPassiveStatesFromOtherPlugins']=function(){const _0x436bbc=_0x5a882d;if(Imported[_0x436bbc(0xe0)])this[_0x436bbc(0x124)]();},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x151)]=function(){return[];},Game_BattlerBase[_0x5a882d(0x381)]['addPassiveStatesByNotetag']=function(){const _0x594f41=_0x5a882d,_0x130058=this[_0x594f41(0x182)][_0x594f41(0x377)]||[],_0x457185=this[_0x594f41(0x151)]();this[_0x594f41(0x182)][_0x594f41(0x377)]=_0x130058||[];for(const _0x13bfa6 of _0x457185){if(!_0x13bfa6)continue;const _0x2d2c72=DataManager[_0x594f41(0x22e)](_0x13bfa6);for(const _0x4efc5f of _0x2d2c72){this['_cache']['passiveStates'][_0x594f41(0x2d1)](_0x4efc5f);}}},DataManager[_0x5a882d(0x22e)]=function(_0x2d574d){const _0x33b69d=_0x5a882d;if(!_0x2d574d)return[];const _0x3c189f=VisuMZ[_0x33b69d(0x12e)][_0x33b69d(0x112)](_0x2d574d,'passiveStateIDs');this[_0x33b69d(0x260)]=this[_0x33b69d(0x260)]||{};if(this['_cache_getPassiveStatesFromObj'][_0x3c189f]!==undefined)return this['_cache_getPassiveStatesFromObj'][_0x3c189f];const _0x51c0b5=[],_0x245c3d=_0x2d574d[_0x33b69d(0xb8)]||'',_0x1fe209=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x5adf46=_0x245c3d[_0x33b69d(0x143)](_0x1fe209);if(_0x5adf46)for(const _0x578919 of _0x5adf46){_0x578919[_0x33b69d(0x143)](_0x1fe209);const _0x3961bf=String(RegExp['$1'])['split'](',')[_0x33b69d(0x2b9)](_0x517398=>_0x517398[_0x33b69d(0x355)]());for(const _0x58bab8 of _0x3961bf){const _0x18dada=/^\d+$/[_0x33b69d(0x1c1)](_0x58bab8);let _0x27db69=0x0;_0x18dada?_0x27db69=Number(_0x58bab8):_0x27db69=DataManager[_0x33b69d(0x119)](_0x58bab8),_0x27db69&&_0x51c0b5[_0x33b69d(0x2d1)](_0x27db69);}}return this[_0x33b69d(0x260)][_0x3c189f]=_0x51c0b5,this['_cache_getPassiveStatesFromObj'][_0x3c189f];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x2c5)]=function(){const _0x287915=_0x5a882d,_0x4547f9=VisuMZ[_0x287915(0x12e)][_0x287915(0x79)][_0x287915(0x23c)]['Global'];this[_0x287915(0x182)][_0x287915(0x377)]=this['_cache'][_0x287915(0x377)][_0x287915(0x24e)](_0x4547f9);},Game_BattlerBase[_0x5a882d(0x167)]=![],Scene_Boot[_0x5a882d(0x381)][_0x5a882d(0x241)]=function(){const _0x5bd604=_0x5a882d,_0x574d43=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x5ce612 of _0x574d43){for(const _0x5628ea of _0x5ce612){if(!_0x5628ea)continue;const _0x108f17=_0x5628ea['note']||'';if(_0x108f17[_0x5bd604(0x143)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0x5bd604(0x167)]=!![];break;}}}},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x16f)]=function(){const _0x34cd06=_0x5a882d;if(this['isDead']())return;if(!this[_0x34cd06(0x14d)]())return;const _0x3a0871=this[_0x34cd06(0x182)][_0x34cd06(0x377)]||[],_0x23ddd7=this,_0x19b6f6=this[_0x34cd06(0x89)]()[_0x34cd06(0x2bf)](!![],_0x23ddd7),_0x108b32=$gameParty[_0x34cd06(0xd2)]()?this[_0x34cd06(0x263)]()[_0x34cd06(0x2bf)](![],_0x23ddd7):[];this[_0x34cd06(0x182)][_0x34cd06(0x377)]=_0x3a0871||[],this[_0x34cd06(0x182)][_0x34cd06(0x377)]=this[_0x34cd06(0x182)][_0x34cd06(0x377)][_0x34cd06(0x24e)](_0x19b6f6)[_0x34cd06(0x24e)](_0x108b32);},Game_Unit['prototype'][_0x5a882d(0x2bf)]=function(_0x29d963,_0x13cdb1){const _0x189b3a=_0x5a882d;let _0xb84faf=[];const _0x3767e8=this===$gameParty?this[_0x189b3a(0xe2)]():this['members']();for(const _0x33d976 of _0x3767e8){if(!_0x33d976)continue;if(!_0x33d976[_0x189b3a(0x14d)]())continue;const _0x10d301=_0x33d976['passiveStateObjects']();for(const _0x497edd of _0x10d301){if(!_0x497edd)continue;if(!VisuMZ['SkillsStatesCore'][_0x189b3a(0x235)](_0x497edd,_0x29d963,_0x33d976,_0x13cdb1))continue;let _0x207b16=DataManager[_0x189b3a(0x198)](_0x497edd,_0x29d963);for(const _0x324bb1 of _0x207b16){if(!VisuMZ[_0x189b3a(0x12e)][_0x189b3a(0xe3)](_0x324bb1,_0x29d963,_0x33d976,_0x13cdb1))continue;_0xb84faf[_0x189b3a(0x2d1)](_0x324bb1),!_0x13cdb1[_0x189b3a(0x18e)](_0x324bb1)&&_0x13cdb1[_0x189b3a(0x106)](_0x324bb1,_0x33d976);}}}return _0xb84faf;},DataManager[_0x5a882d(0x198)]=function(_0x56cb26,_0x141c97){const _0x469b51=_0x5a882d;if(!_0x56cb26)return[];const _0xd57d5e=_0x141c97?_0x469b51(0xfd):'miasmaStateIDs',_0x119109=VisuMZ[_0x469b51(0x12e)]['createKeyJS'](_0x56cb26,_0xd57d5e);this[_0x469b51(0x2b7)]=this[_0x469b51(0x2b7)]||{};if(this['_cache_getAuraPassiveStatesFromObj'][_0x119109]!==undefined)return this[_0x469b51(0x2b7)][_0x119109];const _0x24c243=[],_0x329754=_0x56cb26['note']||'',_0x19c440=_0x141c97?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x5704a4=_0x329754[_0x469b51(0x143)](_0x19c440);if(_0x5704a4)for(const _0x232c7f of _0x5704a4){_0x232c7f[_0x469b51(0x143)](_0x19c440);const _0x197cfd=String(RegExp['$1'])[_0x469b51(0x105)](',')[_0x469b51(0x2b9)](_0x3039e4=>_0x3039e4[_0x469b51(0x355)]());for(const _0x2cfaed of _0x197cfd){const _0x16da45=/^\d+$/[_0x469b51(0x1c1)](_0x2cfaed);let _0x4c3fbc=0x0;_0x16da45?_0x4c3fbc=Number(_0x2cfaed):_0x4c3fbc=DataManager['getStateIdWithName'](_0x2cfaed),_0x4c3fbc&&_0x24c243['push'](_0x4c3fbc);}}return this[_0x469b51(0x2b7)][_0x119109]=_0x24c243,this[_0x469b51(0x2b7)][_0x119109];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x235)]=function(_0x4d5b53,_0x20cf04,_0x3380ec,_0xb8a960){const _0x18c458=_0x5a882d;if(!_0x4d5b53)return![];if(_0x4d5b53[_0x18c458(0x1d9)]!==undefined&&_0x4d5b53['maxTurns']!==undefined)return![];const _0x12fdaa=_0x4d5b53['note']||'';if(!VisuMZ[_0x18c458(0x12e)][_0x18c458(0x329)](_0x12fdaa,_0x20cf04,_0x3380ec,_0xb8a960))return![];return!![];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xe3)]=function(_0x2cead6,_0x34e44c,_0x3b8727,_0x503806){const _0x3a1a9a=_0x5a882d,_0x4fda0b=$dataStates[_0x2cead6];if(!_0x4fda0b)return![];const _0xee3fae=_0x4fda0b[_0x3a1a9a(0xb8)]||'';if(!VisuMZ[_0x3a1a9a(0x12e)][_0x3a1a9a(0x329)](_0xee3fae,_0x34e44c,_0x3b8727,_0x503806))return![];return!![];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x329)]=function(_0x2606f7,_0xaa3ad2,_0x4c1122,_0xa65ae8){const _0x253dc1=_0x5a882d;_0x2606f7=_0x2606f7||'';if(_0x4c1122[_0x253dc1(0x21e)]()){if(_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<ALLOW DEAD AURA>/i)){}else{if(!_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<DEAD AURA ONLY>/i)){}else{if(!_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<DEAD AURA ONLY>/i))return![];else{if(!_0xaa3ad2&&_0x2606f7[_0x253dc1(0x143)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0xaa3ad2){if(_0x2606f7[_0x253dc1(0x143)](/<AURA NOT FOR USER>/i)){if(_0x4c1122===_0xa65ae8)return![];}else{if(_0x2606f7[_0x253dc1(0x143)](/<NOT USER AURA>/i)){if(_0x4c1122===_0xa65ae8)return![];}}}return!![];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x19d)]=function(_0x2a31e1){const _0x4be51b=_0x5a882d;if(typeof _0x2a31e1!==_0x4be51b(0x321))_0x2a31e1=_0x2a31e1['id'];return this['_stateTurns'][_0x2a31e1]||0x0;},Game_BattlerBase['prototype']['setStateTurns']=function(_0x3306b0,_0x5613c9){const _0x2e6c61=_0x5a882d;if(typeof _0x3306b0!==_0x2e6c61(0x321))_0x3306b0=_0x3306b0['id'];if(this['isStateAffected'](_0x3306b0)){const _0x1f410c=DataManager['stateMaximumTurns'](_0x3306b0);this[_0x2e6c61(0x31c)][_0x3306b0]=_0x5613c9['clamp'](0x0,_0x1f410c);if(this['_stateTurns'][_0x3306b0]<=0x0)this['removeState'](_0x3306b0);}},Game_BattlerBase['prototype'][_0x5a882d(0x28f)]=function(_0x25058d,_0x1bb28d){const _0x227ded=_0x5a882d;if(typeof _0x25058d!=='number')_0x25058d=_0x25058d['id'];this[_0x227ded(0x18e)](_0x25058d)&&(_0x1bb28d+=this[_0x227ded(0x19d)](_0x25058d),this[_0x227ded(0x88)](_0x25058d,_0x1bb28d));},VisuMZ[_0x5a882d(0x12e)]['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x228)],Game_BattlerBase[_0x5a882d(0x381)]['eraseBuff']=function(_0x5c612a){const _0x432dc5=_0x5a882d,_0x4ff89e=this[_0x432dc5(0x267)][_0x5c612a];VisuMZ[_0x432dc5(0x12e)][_0x432dc5(0xb2)]['call'](this,_0x5c612a);if(_0x4ff89e>0x0)this[_0x432dc5(0x30e)](_0x5c612a);if(_0x4ff89e<0x0)this[_0x432dc5(0x350)](_0x5c612a);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x38a)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x29f)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x29f)]=function(_0x3f071b){const _0x3cedfc=_0x5a882d;VisuMZ[_0x3cedfc(0x12e)][_0x3cedfc(0x38a)]['call'](this,_0x3f071b);if(!this[_0x3cedfc(0x23b)](_0x3f071b))this['eraseBuff'](_0x3f071b);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2ed)]=Game_BattlerBase[_0x5a882d(0x381)]['decreaseBuff'],Game_BattlerBase['prototype'][_0x5a882d(0x32d)]=function(_0x113020){const _0x6fd1ae=_0x5a882d;VisuMZ[_0x6fd1ae(0x12e)][_0x6fd1ae(0x2ed)][_0x6fd1ae(0x1c3)](this,_0x113020);if(!this[_0x6fd1ae(0x23b)](_0x113020))this['eraseBuff'](_0x113020);},Game_BattlerBase[_0x5a882d(0x381)]['onEraseBuff']=function(_0x56326b){},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x350)]=function(_0xf1ab1){},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x116)]=function(_0x183d1d){const _0x165668=_0x5a882d;return this['_buffs'][_0x183d1d]===VisuMZ[_0x165668(0x12e)][_0x165668(0x79)]['Buffs'][_0x165668(0xcb)];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x374)]=function(_0x1f3db4){const _0x491b47=_0x5a882d;return this[_0x491b47(0x267)][_0x1f3db4]===-VisuMZ[_0x491b47(0x12e)][_0x491b47(0x79)][_0x491b47(0x25e)][_0x491b47(0x327)];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2cf)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x16c)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x16c)]=function(_0x2fb2c7,_0x410c85){const _0x40807a=_0x5a882d;return _0x2fb2c7=_0x2fb2c7[_0x40807a(0x277)](-0x2,0x2),VisuMZ[_0x40807a(0x12e)]['Game_BattlerBase_buffIconIndex'][_0x40807a(0x1c3)](this,_0x2fb2c7,_0x410c85);},Game_BattlerBase['prototype'][_0x5a882d(0xc9)]=function(_0x27e845){const _0x36bd1=_0x5a882d,_0x287a15=this[_0x36bd1(0x267)][_0x27e845];return VisuMZ[_0x36bd1(0x12e)]['Settings']['Buffs'][_0x36bd1(0xed)]['call'](this,_0x27e845,_0x287a15);},Game_BattlerBase[_0x5a882d(0x381)]['buffTurns']=function(_0x5efaf2){const _0x32a73b=_0x5a882d;return this[_0x32a73b(0x128)][_0x5efaf2]||0x0;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1d5)]=function(_0x16020a){return this['buffTurns'](_0x16020a);},Game_BattlerBase['prototype'][_0x5a882d(0x169)]=function(_0x39d24a,_0x35f6b9){const _0x11b973=_0x5a882d;if(this[_0x11b973(0x1ed)](_0x39d24a)){const _0x49f2f1=VisuMZ[_0x11b973(0x12e)][_0x11b973(0x79)][_0x11b973(0x25e)][_0x11b973(0x9d)];this[_0x11b973(0x128)][_0x39d24a]=_0x35f6b9['clamp'](0x0,_0x49f2f1);}},Game_BattlerBase['prototype'][_0x5a882d(0x2d8)]=function(_0x5442b5,_0x8592c8){const _0x42e057=_0x5a882d;this['isBuffAffected'](_0x5442b5)&&(_0x8592c8+=this['buffTurns'](_0x5442b5),this[_0x42e057(0x169)](_0x5442b5,_0x8592c8));},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0xbf)]=function(_0x19dd29,_0x26fad5){const _0x13aa13=_0x5a882d;if(this[_0x13aa13(0x34b)](_0x19dd29)){const _0x372c64=VisuMZ[_0x13aa13(0x12e)][_0x13aa13(0x79)][_0x13aa13(0x25e)][_0x13aa13(0x9d)];this['_buffTurns'][_0x19dd29]=_0x26fad5[_0x13aa13(0x277)](0x0,_0x372c64);}},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x354)]=function(_0x348a06,_0x171667){const _0x55561d=_0x5a882d;this[_0x55561d(0x34b)](_0x348a06)&&(_0x171667+=this[_0x55561d(0x1b3)](_0x348a06),this['setDebuffTurns'](_0x348a06,_0x171667));},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x162)]=function(_0xe90ef){const _0x45c874=_0x5a882d;if(typeof _0xe90ef!==_0x45c874(0x321))_0xe90ef=_0xe90ef['id'];return this['_stateData']=this['_stateData']||{},this['_stateData'][_0xe90ef]=this[_0x45c874(0xd6)][_0xe90ef]||{},this[_0x45c874(0xd6)][_0xe90ef];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x247)]=function(_0x5a6bdd,_0x4c74f5){const _0x18c021=_0x5a882d;if(typeof _0x5a6bdd!==_0x18c021(0x321))_0x5a6bdd=_0x5a6bdd['id'];const _0x4bd607=this[_0x18c021(0x162)](_0x5a6bdd);return _0x4bd607[_0x4c74f5];},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0xe4)]=function(_0x2545f5,_0x56c0a9,_0x525746){const _0x2729e2=_0x5a882d;if(typeof _0x2545f5!=='number')_0x2545f5=_0x2545f5['id'];const _0x4b2a3=this[_0x2729e2(0x162)](_0x2545f5);_0x4b2a3[_0x56c0a9]=_0x525746;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x21b)]=function(_0x3cf196){const _0x2fa429=_0x5a882d;if(typeof _0x3cf196!==_0x2fa429(0x321))_0x3cf196=_0x3cf196['id'];this[_0x2fa429(0xd6)]=this[_0x2fa429(0xd6)]||{},this[_0x2fa429(0xd6)][_0x3cf196]={};},Game_BattlerBase['prototype']['getStateDisplay']=function(_0x5e7d1e){const _0x57a0d4=_0x5a882d;if(typeof _0x5e7d1e!=='number')_0x5e7d1e=_0x5e7d1e['id'];return this[_0x57a0d4(0x37b)]=this[_0x57a0d4(0x37b)]||{},this[_0x57a0d4(0x37b)][_0x5e7d1e]===undefined&&(this[_0x57a0d4(0x37b)][_0x5e7d1e]=''),this['_stateDisplay'][_0x5e7d1e];},Game_BattlerBase[_0x5a882d(0x381)]['setStateDisplay']=function(_0x38df83,_0x95f11f){const _0x4c5edd=_0x5a882d;if(typeof _0x38df83!==_0x4c5edd(0x321))_0x38df83=_0x38df83['id'];this['_stateDisplay']=this[_0x4c5edd(0x37b)]||{},this['_stateDisplay'][_0x38df83]=_0x95f11f;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x20d)]=function(_0x3abc9b){const _0x3812c3=_0x5a882d;if(typeof _0x3abc9b!==_0x3812c3(0x321))_0x3abc9b=_0x3abc9b['id'];this[_0x3812c3(0x37b)]=this['_stateDisplay']||{},this[_0x3812c3(0x37b)][_0x3abc9b]='';},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x199)]=function(_0x100c51){const _0x3c632f=_0x5a882d;if(typeof _0x100c51!==_0x3c632f(0x321))_0x100c51=_0x100c51['id'];this['_stateOrigin']=this[_0x3c632f(0x163)]||{},this[_0x3c632f(0x163)][_0x100c51]=this[_0x3c632f(0x163)][_0x100c51]||_0x3c632f(0x33d);const _0x4023b8=this[_0x3c632f(0x163)][_0x100c51];return this[_0x3c632f(0x20c)](_0x4023b8);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x106)]=function(_0x1a9e4e,_0x32fdc1){const _0x421905=_0x5a882d;this[_0x421905(0x163)]=this[_0x421905(0x163)]||{};const _0x424c08=_0x32fdc1?this[_0x421905(0x342)](_0x32fdc1):this['getCurrentStateOriginKey']();this[_0x421905(0x163)][_0x1a9e4e]=_0x424c08;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x13d)]=function(_0x285793){const _0x1e884e=_0x5a882d;this[_0x1e884e(0x163)]=this[_0x1e884e(0x163)]||{},delete this[_0x1e884e(0x163)][_0x285793];},Game_BattlerBase[_0x5a882d(0x381)]['clearAllStateOrigins']=function(){const _0x41c2de=_0x5a882d;this[_0x41c2de(0x163)]={};},Game_BattlerBase['prototype']['getCurrentStateOriginKey']=function(){const _0xb522a3=_0x5a882d,_0x2898d6=this[_0xb522a3(0x201)]();return this['convertTargetToStateOriginKey'](_0x2898d6);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x201)]=function(){const _0x3c52c4=_0x5a882d;if($gameParty[_0x3c52c4(0xd2)]()){if(BattleManager[_0x3c52c4(0xb3)])return BattleManager['_subject'];else{if(BattleManager['_currentActor'])return BattleManager[_0x3c52c4(0x29a)];}}else{const _0x115eb4=SceneManager[_0x3c52c4(0x12d)];if(![Scene_Map,Scene_Item][_0x3c52c4(0x129)](_0x115eb4[_0x3c52c4(0x193)]))return $gameParty[_0x3c52c4(0x1a2)]();}return this;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x342)]=function(_0x500e8b){const _0x3df3ca=_0x5a882d;if(!_0x500e8b)return _0x3df3ca(0x33d);if(_0x500e8b[_0x3df3ca(0x2dd)]())return _0x3df3ca(0x97)[_0x3df3ca(0x27c)](_0x500e8b[_0x3df3ca(0x8f)]());else{const _0x33e706=_0x3df3ca(0x30f)[_0x3df3ca(0x27c)](_0x500e8b[_0x3df3ca(0x2ce)]()),_0x1363d6=_0x3df3ca(0xdb)['format'](_0x500e8b[_0x3df3ca(0x356)]()),_0x2a7c82=_0x3df3ca(0x1bd)['format']($gameTroop[_0x3df3ca(0x1cd)]());return _0x3df3ca(0x30a)[_0x3df3ca(0x27c)](_0x33e706,_0x1363d6,_0x2a7c82);}return _0x3df3ca(0x33d);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x20c)]=function(_0xd078cd){const _0x37acd4=_0x5a882d;if(_0xd078cd===_0x37acd4(0x33d))return this;else{if(_0xd078cd[_0x37acd4(0x143)](/<actor-(\d+)>/i))return $gameActors[_0x37acd4(0x351)](Number(RegExp['$1']));else{if($gameParty[_0x37acd4(0xd2)]()&&_0xd078cd[_0x37acd4(0x143)](/<troop-(\d+)>/i)){const _0x29875b=Number(RegExp['$1']);if(_0x29875b===$gameTroop[_0x37acd4(0x1cd)]()){if(_0xd078cd[_0x37acd4(0x143)](/<member-(\d+)>/i))return $gameTroop['members']()[Number(RegExp['$1'])];}}if(_0xd078cd[_0x37acd4(0x143)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x10b)]=function(_0x1b7a98){const _0x250f94=_0x5a882d;if(!_0x1b7a98)return![];if(this[_0x250f94(0x268)]())return!![];this[_0x250f94(0x306)]=this['_skillToggle']||{};if(this[_0x250f94(0x306)][_0x1b7a98['id']]===undefined){this[_0x250f94(0x2dd)]()?this['_skillToggle'][_0x1b7a98['id']]=DataManager[_0x250f94(0xeb)](_0x1b7a98):this[_0x250f94(0x306)][_0x1b7a98['id']]=!![];if(this[_0x250f94(0x306)][_0x1b7a98['id']]&&DataManager[_0x250f94(0x38c)](_0x1b7a98)[_0x250f94(0x36d)]>0x0){const _0x5e8005=DataManager[_0x250f94(0x38c)](_0x1b7a98),_0x28c4ac=this['skills']()[_0x250f94(0x264)](_0x2f03d7=>_0x2f03d7!==_0x1b7a98)[_0x250f94(0x264)](_0x4d96e3=>DataManager[_0x250f94(0x146)](_0x4d96e3))[_0x250f94(0x264)](_0x27b7dd=>DataManager[_0x250f94(0x38c)](_0x27b7dd)['some'](_0xdb0b0d=>_0x5e8005[_0x250f94(0x129)](_0xdb0b0d)));_0x28c4ac[_0x250f94(0x36d)]>0x0&&(this[_0x250f94(0x306)][_0x1b7a98['id']]=![]);}if(this['_skillToggle'][_0x1b7a98['id']]){this[_0x250f94(0x30d)](),$gameParty['refreshAllMembers']();if($gameParty['inBattle']())$gameTroop['refreshAllMembers']();}}return this[_0x250f94(0x306)][_0x1b7a98['id']];},Game_BattlerBase['prototype']['setSkillToggle']=function(_0x1d4bfb,_0x136275){const _0x5b2d60=_0x5a882d;if(!DataManager['isToggleSkill'](_0x1d4bfb))return;if(this[_0x5b2d60(0x268)]())return;this[_0x5b2d60(0x306)]=this['_skillToggle']||{};if(_0x136275&&DataManager[_0x5b2d60(0x38c)](_0x1d4bfb)[_0x5b2d60(0x36d)]>0x0){const _0xac9d31=DataManager[_0x5b2d60(0x38c)](_0x1d4bfb),_0x4bbfd6=this[_0x5b2d60(0xc2)]()[_0x5b2d60(0x264)](_0x5682f7=>DataManager[_0x5b2d60(0x146)](_0x5682f7))[_0x5b2d60(0x264)](_0x340753=>DataManager[_0x5b2d60(0x38c)](_0x340753)[_0x5b2d60(0x369)](_0x306abc=>_0xac9d31[_0x5b2d60(0x129)](_0x306abc)));for(const _0x9ef42a of _0x4bbfd6){if(!_0x9ef42a)continue;this['_skillToggle'][_0x9ef42a['id']]=![];}}this['_skillToggle'][_0x1d4bfb['id']]=_0x136275,this[_0x5b2d60(0x30d)](),$gameParty['refreshAllMembers']();if($gameParty[_0x5b2d60(0xd2)]())$gameTroop['refreshAllMembers']();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x349)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x2fe)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x2fe)]=function(_0x156380){const _0x4ed148=_0x5a882d;if(DataManager['isToggleSkill'](_0x156380)){if(this[_0x4ed148(0x2dd)]()){if($gameParty[_0x4ed148(0xd2)]()){if(this[_0x4ed148(0x123)]())return![];if(this['isConfused']())return![];}if(this[_0x4ed148(0x10b)](_0x156380))return!![];}else return![];}return VisuMZ[_0x4ed148(0x12e)][_0x4ed148(0x349)][_0x4ed148(0x1c3)](this,_0x156380);},VisuMZ[_0x5a882d(0x12e)]['Game_Action_isValid']=Game_Action[_0x5a882d(0x381)][_0x5a882d(0xd0)],Game_Action[_0x5a882d(0x381)][_0x5a882d(0xd0)]=function(){const _0x27ac60=_0x5a882d;if(DataManager[_0x27ac60(0x146)](this[_0x27ac60(0x16a)]()))return![];return VisuMZ['SkillsStatesCore'][_0x27ac60(0x271)]['call'](this);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2a7)]=Game_Battler['prototype']['addState'],Game_Battler[_0x5a882d(0x381)]['addState']=function(_0x4d9170){const _0x444b75=_0x5a882d,_0x4eaad9=this[_0x444b75(0x289)](_0x4d9170);VisuMZ[_0x444b75(0x12e)][_0x444b75(0x2a7)][_0x444b75(0x1c3)](this,_0x4d9170);if(_0x4eaad9&&this['hasState']($dataStates[_0x4d9170])){this[_0x444b75(0x2de)](_0x4d9170);;}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1db)]=Game_Battler[_0x5a882d(0x381)]['isStateAddable'],Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x289)]=function(_0x533bfb){const _0x359d52=_0x5a882d,_0x22890f=$dataStates[_0x533bfb];if(_0x22890f&&_0x22890f[_0x359d52(0xb8)][_0x359d52(0x143)](/<NO DEATH CLEAR>/i))return!this[_0x359d52(0x1ee)](_0x533bfb)&&!this['isStateRestrict'](_0x533bfb)&&!this[_0x359d52(0x297)]['isStateRemoved'](_0x533bfb);return VisuMZ[_0x359d52(0x12e)]['Game_Battler_isStateAddable'][_0x359d52(0x1c3)](this,_0x533bfb);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x160)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1ca)],Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1ca)]=function(_0x2d7e99){const _0x49dbea=_0x5a882d;VisuMZ[_0x49dbea(0x12e)]['Game_BattlerBase_addNewState'][_0x49dbea(0x1c3)](this,_0x2d7e99);if(_0x2d7e99===this['deathStateId']())while(this[_0x49dbea(0x157)][_0x49dbea(0x264)](_0x29dbec=>_0x29dbec===this[_0x49dbea(0x223)]())[_0x49dbea(0x36d)]>0x1){const _0x1d9024=this[_0x49dbea(0x157)][_0x49dbea(0x22d)](this[_0x49dbea(0x223)]());this[_0x49dbea(0x157)]['splice'](_0x1d9024,0x1);}},Game_Battler['prototype'][_0x5a882d(0x2de)]=function(_0x5286d1){const _0xf5a93a=_0x5a882d;this[_0xf5a93a(0x106)](_0x5286d1),this[_0xf5a93a(0x185)](_0x5286d1),this[_0xf5a93a(0x87)](_0x5286d1),this[_0xf5a93a(0x1e5)](_0x5286d1),this[_0xf5a93a(0x2a3)](_0x5286d1);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0xa3)]=function(_0x598b3a){const _0x2acd00=_0x5a882d;this[_0x2acd00(0x33e)](_0x598b3a),this[_0x2acd00(0x95)](_0x598b3a),Game_BattlerBase[_0x2acd00(0x381)][_0x2acd00(0xa3)]['call'](this,_0x598b3a);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x386)]=function(_0x244729){const _0x442327=_0x5a882d;for(const _0x9c770f of this[_0x442327(0x292)]()){this['isStateExpired'](_0x9c770f['id'])&&_0x9c770f[_0x442327(0x1d9)]===_0x244729&&(this[_0x442327(0x1a3)](_0x9c770f['id']),this[_0x442327(0xac)](_0x9c770f['id']),this[_0x442327(0x2d6)](_0x9c770f['id']));}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0xac)]=function(_0x23029c){const _0x1b61c5=_0x5a882d;this[_0x1b61c5(0x31b)](_0x23029c);},Game_Battler['prototype']['onAddStateCustomJS']=function(_0x4ab3ce){const _0xf46175=_0x5a882d;if(this[_0xf46175(0x18d)]||this['_tempBattler'])return;const _0x56009b=VisuMZ[_0xf46175(0x12e)][_0xf46175(0x31d)];if(_0x56009b[_0x4ab3ce])_0x56009b[_0x4ab3ce][_0xf46175(0x1c3)](this,_0x4ab3ce);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x33e)]=function(_0x4e64ff){const _0x3f650b=_0x5a882d;if(this[_0x3f650b(0x18d)]||this['_tempBattler'])return;const _0x5eea71=VisuMZ[_0x3f650b(0x12e)][_0x3f650b(0x1cc)];if(_0x5eea71[_0x4e64ff])_0x5eea71[_0x4e64ff][_0x3f650b(0x1c3)](this,_0x4e64ff);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x31b)]=function(_0x423af3){const _0x429baa=_0x5a882d;if(this[_0x429baa(0x18d)]||this['_tempBattler'])return;const _0x24bcef=VisuMZ[_0x429baa(0x12e)][_0x429baa(0x2c0)];if(_0x24bcef[_0x423af3])_0x24bcef[_0x423af3][_0x429baa(0x1c3)](this,_0x423af3);},Game_Battler['prototype'][_0x5a882d(0x2a3)]=function(_0x73e3cd){const _0x4d44ed=_0x5a882d;if(this[_0x4d44ed(0x18d)]||this[_0x4d44ed(0xa2)])return;try{VisuMZ[_0x4d44ed(0x12e)]['Settings'][_0x4d44ed(0x15c)]['onAddStateJS'][_0x4d44ed(0x1c3)](this,_0x73e3cd);}catch(_0x568561){if($gameTemp[_0x4d44ed(0x19f)]())console[_0x4d44ed(0x256)](_0x568561);}},Game_Battler[_0x5a882d(0x381)]['onEraseStateGlobalJS']=function(_0x475b77){const _0xfbf008=_0x5a882d;if(this[_0xfbf008(0x18d)]||this[_0xfbf008(0xa2)])return;try{VisuMZ[_0xfbf008(0x12e)][_0xfbf008(0x79)][_0xfbf008(0x15c)]['onEraseStateJS']['call'](this,_0x475b77);}catch(_0x4205ae){if($gameTemp['isPlaytest']())console[_0xfbf008(0x256)](_0x4205ae);}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x2d6)]=function(_0x2ed97d){const _0x526679=_0x5a882d;if(this[_0x526679(0x18d)]||this[_0x526679(0xa2)])return;try{VisuMZ[_0x526679(0x12e)]['Settings'][_0x526679(0x15c)][_0x526679(0x287)]['call'](this,_0x2ed97d);}catch(_0x4d6be4){if($gameTemp[_0x526679(0x19f)]())console[_0x526679(0x256)](_0x4d6be4);}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x9c)]=function(_0x38c6cf){const _0x1feb9e=_0x5a882d;return _0x38c6cf=_0x38c6cf[_0x1feb9e(0x270)]()[_0x1feb9e(0x355)](),this[_0x1feb9e(0x292)]()[_0x1feb9e(0x264)](_0x1fc133=>_0x1fc133['categories'][_0x1feb9e(0x129)](_0x38c6cf));},Game_Battler[_0x5a882d(0x381)]['removeStatesByCategory']=function(_0x57f9a9,_0x6dbbe6){const _0x2f960c=_0x5a882d;_0x57f9a9=_0x57f9a9[_0x2f960c(0x270)]()['trim'](),_0x6dbbe6=_0x6dbbe6||0x0;const _0x161a3e=this[_0x2f960c(0x9c)](_0x57f9a9),_0x45b35f=[];for(const _0x147045 of _0x161a3e){if(!_0x147045)continue;if(_0x6dbbe6<=0x0)break;_0x45b35f['push'](_0x147045['id']),this['_result'][_0x2f960c(0x18b)]=!![],_0x6dbbe6--;}while(_0x45b35f[_0x2f960c(0x36d)]>0x0){this[_0x2f960c(0x1a3)](_0x45b35f[_0x2f960c(0x133)]());}},Game_Battler['prototype'][_0x5a882d(0xa8)]=function(_0x4eb7df,_0x3e8d23){const _0x140576=_0x5a882d;_0x4eb7df=_0x4eb7df[_0x140576(0x270)]()[_0x140576(0x355)](),_0x3e8d23=_0x3e8d23||[];const _0x56e443=this[_0x140576(0x9c)](_0x4eb7df),_0x1e5cf5=[];for(const _0x4f6fe4 of _0x56e443){if(!_0x4f6fe4)continue;if(_0x3e8d23[_0x140576(0x129)](_0x4f6fe4))continue;_0x1e5cf5[_0x140576(0x2d1)](_0x4f6fe4['id']),this['_result'][_0x140576(0x18b)]=!![];}while(_0x1e5cf5[_0x140576(0x36d)]>0x0){this[_0x140576(0x1a3)](_0x1e5cf5[_0x140576(0x133)]());}},Game_Battler[_0x5a882d(0x381)]['isStateCategoryAffected']=function(_0x2695fb){const _0x5081a6=_0x5a882d;return this[_0x5081a6(0x195)](_0x2695fb)>0x0;},Game_Battler['prototype'][_0x5a882d(0x265)]=function(_0x19c9d2){const _0x4d5257=_0x5a882d;return this[_0x4d5257(0x2fc)](_0x19c9d2)>0x0;},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x195)]=function(_0x2044d1){const _0x638c4c=_0x5a882d,_0x7853e=this['statesByCategory'](_0x2044d1)[_0x638c4c(0x264)](_0x375054=>this['isStateAffected'](_0x375054['id']));return _0x7853e['length'];},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x2fc)]=function(_0x52984a){const _0x38f696=_0x5a882d,_0x101f18=this[_0x38f696(0x9c)](_0x52984a);return _0x101f18['length'];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x197)]=Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1ee)],Game_BattlerBase['prototype']['isStateResist']=function(_0x18f188){const _0x38c0f4=_0x5a882d,_0x3471e6=$dataStates[_0x18f188];if(_0x3471e6&&_0x3471e6[_0x38c0f4(0xfc)][_0x38c0f4(0x36d)]>0x0)for(const _0x1ba6a8 of _0x3471e6[_0x38c0f4(0xfc)]){if(this[_0x38c0f4(0x242)](_0x1ba6a8))return!![];}return VisuMZ['SkillsStatesCore'][_0x38c0f4(0x197)][_0x38c0f4(0x1c3)](this,_0x18f188);},Game_BattlerBase[_0x5a882d(0x381)]['isStateCategoryResisted']=function(_0x1287d8){const _0x30a58c=_0x5a882d;let _0x20debe=_0x30a58c(0xe1);if(this[_0x30a58c(0x387)](_0x20debe))return this['_cache'][_0x20debe][_0x30a58c(0x129)](_0x1287d8);return this['_cache'][_0x20debe]=this[_0x30a58c(0x1e4)](),this['_cache'][_0x20debe][_0x30a58c(0x129)](_0x1287d8);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1e4)]=function(){const _0x175909=_0x5a882d,_0x5072c6=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x5416ff=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x5a18a4=[];for(const _0x44a9a6 of this[_0x175909(0x365)]()){if(!_0x44a9a6)continue;const _0x556a72=_0x44a9a6[_0x175909(0xb8)],_0x4331d5=_0x556a72[_0x175909(0x143)](_0x5072c6);if(_0x4331d5)for(const _0x551615 of _0x4331d5){_0x551615['match'](_0x5072c6);const _0x3c1fb6=String(RegExp['$1'])['split'](',')[_0x175909(0x2b9)](_0x54ce7b=>String(_0x54ce7b)[_0x175909(0x270)]()['trim']());_0x5a18a4=_0x5a18a4['concat'](_0x3c1fb6);}if(_0x556a72['match'](_0x5416ff)){const _0x3b078c=String(RegExp['$1'])[_0x175909(0x105)](/[\r\n]+/)[_0x175909(0x2b9)](_0x17d3a6=>String(_0x17d3a6)['toUpperCase']()[_0x175909(0x355)]());_0x5a18a4=_0x5a18a4[_0x175909(0x24e)](_0x3b078c);}}return _0x5a18a4;},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x185)]=function(_0x2c0fb5){const _0x5ccd2a=_0x5a882d,_0x4dd0e5=$dataStates[_0x2c0fb5];if(!_0x4dd0e5)return;const _0x7cd4f3=_0x4dd0e5['note']||'',_0x2fe587=_0x7cd4f3[_0x5ccd2a(0x143)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x2fe587){const _0x138830=[_0x4dd0e5];for(const _0xecb316 of _0x2fe587){_0xecb316[_0x5ccd2a(0x143)](/<REMOVE OTHER (.*) STATES>/i);const _0x24573b=String(RegExp['$1']);this['removeStatesByCategoryAll'](_0x24573b,_0x138830);}}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x1f2)]=function(){const _0x234ee6=_0x5a882d;for(const _0x1651ee of this[_0x234ee6(0x292)]()){if(!_0x1651ee)continue;if(!this[_0x234ee6(0x18e)](_0x1651ee['id']))continue;if(!_0x1651ee[_0x234ee6(0x1a7)])continue;if(this[_0x234ee6(0x7c)](_0x1651ee))continue;Math[_0x234ee6(0xec)](0x64)<_0x1651ee[_0x234ee6(0x308)]&&this[_0x234ee6(0x1a3)](_0x1651ee['id']);}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1c7)]=Game_Action['prototype'][_0x5a882d(0x283)],Game_Action['prototype'][_0x5a882d(0x283)]=function(_0x2bcfaf,_0x42b46a){const _0x4f2523=_0x5a882d;$gameTemp[_0x4f2523(0x2f0)]=this[_0x4f2523(0x16a)](),$gameTemp[_0x4f2523(0x343)]=this[_0x4f2523(0x25f)](),$gameTemp[_0x4f2523(0x35d)]=_0x42b46a,VisuMZ[_0x4f2523(0x12e)]['Game_Action_executeHpDamage_bypassStateDmgRemoval']['call'](this,_0x2bcfaf,_0x42b46a),$gameTemp[_0x4f2523(0x2f0)]=undefined,$gameTemp[_0x4f2523(0x343)]=undefined,$gameTemp[_0x4f2523(0x35d)]=undefined;},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x7c)]=function(_0x2a90ff){const _0x5161d0=_0x5a882d;if($gameTemp['_bypassRemoveStateDamage_action']){const _0x288fe0=$gameTemp['_bypassRemoveStateDamage_action'],_0x1c0217=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x5161d0(0x1b7)](_0x2a90ff,_0x288fe0,_0x1c0217,'action'))return!![];}if($gameTemp[_0x5161d0(0x343)]){const _0x5c430f=$gameTemp['_bypassRemoveStateDamage_user'];if(_0x5c430f[_0x5161d0(0x32b)](_0x2a90ff))return!![];}if(this['isTargetBypassRemoveStatesByDamage'](_0x2a90ff))return!![];return![];},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x32b)]=function(_0x73ad00){const _0x370f08=_0x5a882d,_0x9f2980=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x390c9a of this['traitObjects']()){if(!_0x390c9a)continue;if(DataManager[_0x370f08(0x1b7)](_0x73ad00,_0x390c9a,_0x9f2980,_0x370f08(0x9a)))return!![];}return![];},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x18f)]=function(_0x46708d){const _0x5c3573=_0x5a882d,_0x1cf967=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x1b3e5b of this[_0x5c3573(0x365)]()){if(!_0x1b3e5b)continue;if(DataManager[_0x5c3573(0x1b7)](_0x46708d,_0x1b3e5b,_0x1cf967,_0x5c3573(0xb0)))return!![];}return![];},DataManager['CheckBypassRemoveStatesByDamage']=function(_0x5b60ae,_0x334454,_0xe11349,_0x38e406){const _0x2bec64=_0x5a882d,_0x182f70=_0x2bec64(0x33c)[_0x2bec64(0x27c)](_0x334454[_0x2bec64(0x38b)],_0x334454['id'],_0x38e406);this[_0x2bec64(0x12b)]=this['_cache_CheckBypassRemoveStatesByDamage']||{};if(this[_0x2bec64(0x12b)][_0x182f70]!==undefined)return this['_cache_CheckBypassRemoveStatesByDamage'][_0x182f70][_0x2bec64(0x129)](_0x5b60ae['id']);const _0x435b79=[],_0x2ce59d=_0x334454['note'][_0x2bec64(0x143)](_0xe11349);if(_0x2ce59d)for(const _0x2e71d3 of _0x2ce59d){_0x2e71d3['match'](_0xe11349);const _0x148cbf=String(RegExp['$1'])[_0x2bec64(0x105)](',')['map'](_0x316395=>_0x316395[_0x2bec64(0x355)]());for(let _0x43209e of _0x148cbf){_0x43209e=(String(_0x43209e)||'')[_0x2bec64(0x355)]();if(_0x43209e[_0x2bec64(0x143)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x52e333=Math[_0x2bec64(0x348)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x21601b=Math[_0x2bec64(0x27a)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x39d74c=_0x52e333;_0x39d74c<=_0x21601b;_0x39d74c++)elements[_0x2bec64(0x2d1)](_0x39d74c);continue;}const _0x566fa3=/^\d+$/[_0x2bec64(0x1c1)](_0x43209e);_0x566fa3?entryID=Number(_0x43209e):entryID=DataManager[_0x2bec64(0x119)](_0x43209e),entryID&&_0x435b79[_0x2bec64(0x2d1)](entryID);}}return this[_0x2bec64(0x12b)][_0x182f70]=_0x435b79,this['_cache_CheckBypassRemoveStatesByDamage'][_0x182f70]['includes'](_0x5b60ae['id']);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xc1)]=Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x2dc)],Game_Battler['prototype'][_0x5a882d(0x2dc)]=function(_0x58cc5c,_0x81daf8){const _0x3cfb62=_0x5a882d;VisuMZ[_0x3cfb62(0x12e)][_0x3cfb62(0xc1)][_0x3cfb62(0x1c3)](this,_0x58cc5c,_0x81daf8),this[_0x3cfb62(0x1ed)](_0x58cc5c)&&this['onAddBuff'](_0x58cc5c,_0x81daf8);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x358)]=function(_0xf5d59c){},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x13b)]=Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x77)],Game_Battler[_0x5a882d(0x381)]['addDebuff']=function(_0x194db4,_0x5c59ce){const _0x511286=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x511286(0x13b)][_0x511286(0x1c3)](this,_0x194db4,_0x5c59ce),this['isDebuffAffected'](_0x194db4)&&this['onAddDebuff'](_0x194db4,_0x5c59ce);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x2d2)]=function(){const _0xc3d067=_0x5a882d;for(let _0x519320=0x0;_0x519320<this[_0xc3d067(0x12a)]();_0x519320++){if(this[_0xc3d067(0x24d)](_0x519320)){const _0x1a492d=this[_0xc3d067(0x267)][_0x519320];this[_0xc3d067(0x2b3)](_0x519320);if(_0x1a492d>0x0)this[_0xc3d067(0x215)](_0x519320);if(_0x1a492d<0x0)this[_0xc3d067(0x117)](_0x519320);}}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x217)]=function(_0x26a3b5,_0x49582f){const _0x1182fa=_0x5a882d;this[_0x1182fa(0x138)](_0x26a3b5,_0x49582f);},Game_Battler[_0x5a882d(0x381)]['onAddDebuff']=function(_0x144ca4,_0x5a84eb){this['onAddDebuffGlobalJS'](_0x144ca4,_0x5a84eb);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x30e)]=function(_0x1aeaf4){const _0x41ffd2=_0x5a882d;Game_BattlerBase[_0x41ffd2(0x381)][_0x41ffd2(0x30e)]['call'](this,_0x1aeaf4),this['onEraseBuffGlobalJS'](_0x1aeaf4);},Game_Battler[_0x5a882d(0x381)]['onEraseDebuff']=function(_0x45456c){const _0x223bef=_0x5a882d;Game_BattlerBase[_0x223bef(0x381)][_0x223bef(0x350)][_0x223bef(0x1c3)](this,_0x45456c),this[_0x223bef(0x15a)](_0x45456c);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x215)]=function(_0x331309){const _0x211a58=_0x5a882d;this[_0x211a58(0x2b5)](_0x331309);},Game_Battler['prototype']['onExpireDebuff']=function(_0x1bbaad){this['onExpireDebuffGlobalJS'](_0x1bbaad);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x138)]=function(_0x147aa3,_0x403f8a){const _0x1a21d9=_0x5a882d;VisuMZ[_0x1a21d9(0x12e)][_0x1a21d9(0x79)][_0x1a21d9(0x25e)]['onAddBuffJS'][_0x1a21d9(0x1c3)](this,_0x147aa3,_0x403f8a);},Game_Battler[_0x5a882d(0x381)]['onAddDebuffGlobalJS']=function(_0x266dfb,_0x3115d7){const _0x2ab2b7=_0x5a882d;VisuMZ[_0x2ab2b7(0x12e)][_0x2ab2b7(0x79)][_0x2ab2b7(0x25e)]['onAddDebuffJS'][_0x2ab2b7(0x1c3)](this,_0x266dfb,_0x3115d7);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x1e1)]=function(_0x3e35f5){const _0x299f5e=_0x5a882d;VisuMZ[_0x299f5e(0x12e)][_0x299f5e(0x79)][_0x299f5e(0x25e)][_0x299f5e(0x22f)][_0x299f5e(0x1c3)](this,_0x3e35f5);},Game_BattlerBase[_0x5a882d(0x381)][_0x5a882d(0x15a)]=function(_0x407948){const _0x39f533=_0x5a882d;VisuMZ[_0x39f533(0x12e)]['Settings'][_0x39f533(0x25e)][_0x39f533(0x370)][_0x39f533(0x1c3)](this,_0x407948);},Game_Battler['prototype'][_0x5a882d(0x2b5)]=function(_0x4db3b7){const _0x489821=_0x5a882d;VisuMZ[_0x489821(0x12e)][_0x489821(0x79)][_0x489821(0x25e)][_0x489821(0x1c8)][_0x489821(0x1c3)](this,_0x4db3b7);},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x2e5)]=function(_0x3be738){const _0x35b524=_0x5a882d;VisuMZ[_0x35b524(0x12e)][_0x35b524(0x79)][_0x35b524(0x25e)][_0x35b524(0x315)][_0x35b524(0x1c3)](this,_0x3be738);},Game_Battler['prototype']['onAddStateMakeCustomSlipValues']=function(_0x7cec51){const _0x217af5=_0x5a882d,_0x53ed40=VisuMZ[_0x217af5(0x12e)],_0x107ee7=[_0x217af5(0x366),_0x217af5(0xa6),_0x217af5(0x8c),'stateMpSlipHealJS',_0x217af5(0x179),_0x217af5(0x1f0)];for(const _0x1954c3 of _0x107ee7){_0x53ed40[_0x1954c3][_0x7cec51]&&_0x53ed40[_0x1954c3][_0x7cec51][_0x217af5(0x1c3)](this,_0x7cec51);}},VisuMZ['SkillsStatesCore'][_0x5a882d(0xd8)]=Game_Battler[_0x5a882d(0x381)]['regenerateAll'],Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x338)]=function(){const _0xd9c6dc=_0x5a882d;this[_0xd9c6dc(0x137)](),VisuMZ[_0xd9c6dc(0x12e)]['Game_Battler_regenerateAll'][_0xd9c6dc(0x1c3)](this),this[_0xd9c6dc(0xaf)](),this[_0xd9c6dc(0x251)]();},Game_Battler[_0x5a882d(0x381)]['setPassiveStateSlipDamageJS']=function(){const _0xa4d7ea=_0x5a882d;for(const _0x2746a7 of this[_0xa4d7ea(0x377)]()){if(!_0x2746a7)continue;this[_0xa4d7ea(0x87)](_0x2746a7['id']);}},Game_Battler[_0x5a882d(0x381)][_0x5a882d(0x137)]=function(){const _0xd3962e=_0x5a882d;for(const _0x1d1429 of this[_0xd3962e(0x292)]()){if(!_0x1d1429)continue;_0x1d1429['note'][_0xd3962e(0x143)](/<JS SLIP REFRESH>/i)&&this[_0xd3962e(0x87)](_0x1d1429['id']);}},Game_Battler['prototype']['regenerateAllSkillsStatesCore']=function(){const _0x2b2f63=_0x5a882d;if(!this[_0x2b2f63(0x177)]())return;const _0xee413d=this[_0x2b2f63(0x292)]();for(const _0x40bfaf of _0xee413d){if(!_0x40bfaf)continue;this[_0x2b2f63(0x100)](_0x40bfaf);}},Game_Battler['prototype']['onRegenerateCustomStateDamageOverTime']=function(_0x32ea86){const _0x5cebed=_0x5a882d,_0x155122=this[_0x5cebed(0x247)](_0x32ea86['id'],_0x5cebed(0x145))||0x0,_0x3d918e=-this['maxSlipDamage'](),_0x16a5b6=Math[_0x5cebed(0x27a)](_0x155122,_0x3d918e);if(_0x16a5b6!==0x0){const _0x5deff8=this[_0x5cebed(0x297)][_0x5cebed(0x11a)]||0x0;this[_0x5cebed(0x7e)](_0x16a5b6),this[_0x5cebed(0x297)][_0x5cebed(0x11a)]+=_0x5deff8;}const _0x31f00e=this[_0x5cebed(0x247)](_0x32ea86['id'],_0x5cebed(0x28e))||0x0;if(_0x31f00e!==0x0){const _0x1ce99f=this[_0x5cebed(0x297)]['mpDamage']||0x0;this[_0x5cebed(0x1d4)](_0x31f00e),this[_0x5cebed(0x297)]['mpDamage']+=_0x1ce99f;}const _0x2d3513=this['getStateData'](_0x32ea86['id'],_0x5cebed(0x17b))||0x0;_0x2d3513!==0x0&&this[_0x5cebed(0x2d9)](_0x2d3513);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xc0)]=Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x1d8)],Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x1d8)]=function(){const _0x5de747=_0x5a882d,_0x16659b=VisuMZ[_0x5de747(0x12e)][_0x5de747(0xc0)][_0x5de747(0x1c3)](this),_0x5c19e4=VisuMZ[_0x5de747(0x12e)][_0x5de747(0x79)][_0x5de747(0x37d)];let _0xb1f550=_0x5c19e4[_0x5de747(0xb1)];return $gameParty[_0x5de747(0xd2)]()&&(_0xb1f550=_0xb1f550[_0x5de747(0x24e)](_0x5c19e4[_0x5de747(0x120)])),_0x16659b[_0x5de747(0x264)](_0x452aa1=>!_0xb1f550[_0x5de747(0x129)](_0x452aa1));},Game_Actor[_0x5a882d(0x381)]['usableSkills']=function(){const _0x2858fa=_0x5a882d;return this[_0x2858fa(0xc2)]()[_0x2858fa(0x264)](_0x14383e=>this[_0x2858fa(0x382)](_0x14383e));},Game_Actor[_0x5a882d(0x381)]['isSkillUsableForAutoBattle']=function(_0x5addf9){const _0x321802=_0x5a882d;if(!this[_0x321802(0x302)](_0x5addf9))return![];if(!_0x5addf9)return![];if(!this['isSkillTypeMatchForUse'](_0x5addf9))return![];if(this[_0x321802(0x284)](_0x5addf9))return![];return!![];},Game_Actor[_0x5a882d(0x381)][_0x5a882d(0xc8)]=function(_0x5d0254){const _0x1e9030=_0x5a882d,_0x27d9e2=this[_0x1e9030(0x1d8)](),_0x32ab0b=DataManager[_0x1e9030(0x2ff)](_0x5d0254),_0x2c75de=_0x27d9e2[_0x1e9030(0x264)](_0x599331=>_0x32ab0b[_0x1e9030(0x129)](_0x599331));return _0x2c75de['length']>0x0;},Game_Actor['prototype'][_0x5a882d(0x284)]=function(_0x1cd87f){const _0x726dbc=_0x5a882d;if(!VisuMZ[_0x726dbc(0x12e)][_0x726dbc(0x1e7)](this,_0x1cd87f))return!![];if(!VisuMZ['SkillsStatesCore'][_0x726dbc(0x1fd)](this,_0x1cd87f))return!![];if(!VisuMZ['SkillsStatesCore'][_0x726dbc(0x186)](this,_0x1cd87f))return!![];return![];},Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x151)]=function(){const _0x4db302=_0x5a882d;let _0x312566=[this[_0x4db302(0x351)](),this['currentClass']()];_0x312566=_0x312566[_0x4db302(0x24e)](this[_0x4db302(0x134)]()[_0x4db302(0x264)](_0x46702d=>_0x46702d));for(const _0x5ec8c9 of this['_skills']){const _0x2ad1de=$dataSkills[_0x5ec8c9];if(!_0x2ad1de)continue;if(DataManager[_0x4db302(0x146)](_0x2ad1de)){if(!this[_0x4db302(0x10b)](_0x2ad1de))continue;}_0x312566[_0x4db302(0x2d1)](_0x2ad1de);}return _0x312566;},Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x2c5)]=function(){const _0x3c1e89=_0x5a882d;Game_Battler['prototype'][_0x3c1e89(0x2c5)][_0x3c1e89(0x1c3)](this);const _0x156b0c=VisuMZ[_0x3c1e89(0x12e)][_0x3c1e89(0x79)][_0x3c1e89(0x23c)][_0x3c1e89(0x1d0)];this[_0x3c1e89(0x182)][_0x3c1e89(0x377)]=this[_0x3c1e89(0x182)]['passiveStates'][_0x3c1e89(0x24e)](_0x156b0c);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2a9)]=Game_Actor['prototype'][_0x5a882d(0x31a)],Game_Actor[_0x5a882d(0x381)]['learnSkill']=function(_0x303c21){const _0x392bcd=_0x5a882d;VisuMZ[_0x392bcd(0x12e)][_0x392bcd(0x2a9)]['call'](this,_0x303c21),this[_0x392bcd(0x182)]={},this['passiveStates']();},VisuMZ['SkillsStatesCore'][_0x5a882d(0x26c)]=Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x131)],Game_Actor[_0x5a882d(0x381)]['forgetSkill']=function(_0x176b1c){const _0xa76c12=_0x5a882d;VisuMZ[_0xa76c12(0x12e)][_0xa76c12(0x26c)][_0xa76c12(0x1c3)](this,_0x176b1c),this[_0xa76c12(0x182)]={},this[_0xa76c12(0x377)]();},Game_Actor[_0x5a882d(0x381)][_0x5a882d(0x250)]=function(){const _0xb48b94=_0x5a882d;return VisuMZ[_0xb48b94(0x12e)]['Settings'][_0xb48b94(0x15c)][_0xb48b94(0x36b)]??0x14;},Game_Enemy['prototype'][_0x5a882d(0x151)]=function(){const _0x19928c=_0x5a882d;let _0x534a6b=[this[_0x19928c(0x1cb)]()];return _0x534a6b[_0x19928c(0x24e)](this['skills']());},Game_Enemy[_0x5a882d(0x381)][_0x5a882d(0x2c5)]=function(){const _0x588714=_0x5a882d;Game_Battler['prototype'][_0x588714(0x2c5)][_0x588714(0x1c3)](this);const _0x167548=VisuMZ['SkillsStatesCore']['Settings'][_0x588714(0x23c)][_0x588714(0xcc)];this[_0x588714(0x182)][_0x588714(0x377)]=this['_cache'][_0x588714(0x377)][_0x588714(0x24e)](_0x167548);},Game_Enemy[_0x5a882d(0x381)]['skills']=function(){const _0x5ab0f9=_0x5a882d,_0x52080c=[];for(const _0x5aff55 of this[_0x5ab0f9(0x1cb)]()[_0x5ab0f9(0xa5)]){const _0x397e6b=$dataSkills[_0x5aff55[_0x5ab0f9(0x92)]];if(_0x397e6b&&!_0x52080c[_0x5ab0f9(0x129)](_0x397e6b))_0x52080c['push'](_0x397e6b);}return _0x52080c;},Game_Enemy[_0x5a882d(0x381)]['meetsStateCondition']=function(_0xf7c36f){return this['hasState']($dataStates[_0xf7c36f]);},VisuMZ[_0x5a882d(0x12e)]['Game_Unit_isAllDead']=Game_Unit[_0x5a882d(0x381)][_0x5a882d(0x1e9)],Game_Unit[_0x5a882d(0x381)][_0x5a882d(0x1e9)]=function(){const _0x4cca0a=_0x5a882d;if(this['isPartyAllAffectedByGroupDefeatStates']())return!![];return VisuMZ[_0x4cca0a(0x12e)][_0x4cca0a(0x1af)][_0x4cca0a(0x1c3)](this);},Game_Unit[_0x5a882d(0x381)]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x52a96d=_0x5a882d,_0x1e9f2f=this[_0x52a96d(0x21f)]();for(const _0x5aca88 of _0x1e9f2f){if(!_0x5aca88['isGroupDefeatStateAffected']())return![];}return!![];},Game_Unit[_0x5a882d(0x381)][_0x5a882d(0x224)]=function(){const _0x449dd0=_0x5a882d;for(const _0x1f0375 of this[_0x449dd0(0x29b)]()){if(!_0x1f0375)continue;_0x1f0375[_0x449dd0(0x30d)]();}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x108)]=Game_Player[_0x5a882d(0x381)]['refresh'],Game_Player[_0x5a882d(0x381)]['refresh']=function(){const _0x514781=_0x5a882d;VisuMZ[_0x514781(0x12e)][_0x514781(0x108)][_0x514781(0x1c3)](this),$gameParty[_0x514781(0x224)](),$gameParty[_0x514781(0xd2)]()&&$gameTroop[_0x514781(0x224)]();},VisuMZ[_0x5a882d(0x12e)]['Game_Troop_setup']=Game_Troop[_0x5a882d(0x381)][_0x5a882d(0x1ce)],Game_Troop[_0x5a882d(0x381)][_0x5a882d(0x1ce)]=function(_0x2d465a){const _0x4fde04=_0x5a882d;VisuMZ[_0x4fde04(0x12e)][_0x4fde04(0xdc)][_0x4fde04(0x1c3)](this,_0x2d465a),this[_0x4fde04(0x29c)]();},Game_Troop['prototype'][_0x5a882d(0x29c)]=function(){const _0x1be159=_0x5a882d;this[_0x1be159(0x1a8)]=Graphics[_0x1be159(0x31e)];},Game_Troop[_0x5a882d(0x381)][_0x5a882d(0x1cd)]=function(){const _0x535baf=_0x5a882d;return this[_0x535baf(0x1a8)]=this['_currentTroopUniqueID']||Graphics[_0x535baf(0x31e)],this[_0x535baf(0x1a8)];},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x331)]=function(){const _0x5511e1=_0x5a882d;if(ConfigManager[_0x5511e1(0x98)]&&ConfigManager[_0x5511e1(0x258)]!==undefined)return ConfigManager[_0x5511e1(0x258)];else{if(this[_0x5511e1(0x153)]())return this['updatedLayoutStyle']()[_0x5511e1(0x143)](/LOWER/i);else Scene_ItemBase[_0x5511e1(0x381)][_0x5511e1(0x300)]['call'](this);}},Scene_Skill['prototype'][_0x5a882d(0x300)]=function(){const _0x1e606d=_0x5a882d;if(ConfigManager[_0x1e606d(0x98)]&&ConfigManager[_0x1e606d(0x36f)]!==undefined)return ConfigManager[_0x1e606d(0x36f)];else return this[_0x1e606d(0x153)]()?this[_0x1e606d(0x175)]()[_0x1e606d(0x143)](/RIGHT/i):Scene_ItemBase[_0x1e606d(0x381)][_0x1e606d(0x300)][_0x1e606d(0x1c3)](this);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x175)]=function(){const _0x5a2059=_0x5a882d;return VisuMZ[_0x5a2059(0x12e)]['Settings'][_0x5a2059(0x37d)][_0x5a2059(0x262)];},Scene_Skill['prototype'][_0x5a882d(0x34f)]=function(){const _0x5e338a=_0x5a882d;return this[_0x5e338a(0x261)]&&this['_categoryWindow']['isUseModernControls']();},Scene_Skill[_0x5a882d(0x381)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x31aa84=_0x5a882d;return VisuMZ[_0x31aa84(0x12e)][_0x31aa84(0x79)][_0x31aa84(0x37d)][_0x31aa84(0x2b0)];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x341)]=Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x17d)],Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x17d)]=function(){const _0x4f2007=_0x5a882d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x4f2007(0x38d)]():VisuMZ['SkillsStatesCore'][_0x4f2007(0x341)][_0x4f2007(0x1c3)](this);},Scene_Skill['prototype'][_0x5a882d(0x38d)]=function(){const _0x44def2=_0x5a882d,_0x4d70d6=0x0,_0x355a11=this[_0x44def2(0x1ad)](),_0x3d6875=Graphics[_0x44def2(0x363)],_0x379769=this['helpAreaHeight']();return new Rectangle(_0x4d70d6,_0x355a11,_0x3d6875,_0x379769);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x107)]=Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x244)],Scene_Skill[_0x5a882d(0x381)]['skillTypeWindowRect']=function(){const _0x5d4987=_0x5a882d;return this[_0x5d4987(0x153)]()?this[_0x5d4987(0x152)]():VisuMZ[_0x5d4987(0x12e)]['Scene_Skill_skillTypeWindowRect'][_0x5d4987(0x1c3)](this);},Scene_Skill['prototype'][_0x5a882d(0xf0)]=function(){const _0x4a3237=_0x5a882d;return VisuMZ[_0x4a3237(0x12e)][_0x4a3237(0x79)][_0x4a3237(0x37d)][_0x4a3237(0x1b5)]??Scene_MenuBase[_0x4a3237(0x381)][_0x4a3237(0xf0)][_0x4a3237(0x1c3)](this);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x152)]=function(){const _0x9ca88a=_0x5a882d,_0x414075=this[_0x9ca88a(0xf0)](),_0x242b9c=this[_0x9ca88a(0xf6)](0x3,!![]),_0x549e1a=this[_0x9ca88a(0x300)]()?Graphics['boxWidth']-_0x414075:0x0,_0x76a082=this['mainAreaTop']();return new Rectangle(_0x549e1a,_0x76a082,_0x414075,_0x242b9c);},VisuMZ[_0x5a882d(0x12e)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x165)],Scene_Skill[_0x5a882d(0x381)]['statusWindowRect']=function(){const _0xe679d=_0x5a882d;return this[_0xe679d(0x153)]()?this[_0xe679d(0x2cc)]():VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect'][_0xe679d(0x1c3)](this);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x2cc)]=function(){const _0x505f65=_0x5a882d,_0x561e5d=Graphics[_0x505f65(0x363)]-this[_0x505f65(0xf0)](),_0xf63b4c=this[_0x505f65(0xbd)][_0x505f65(0x2f6)],_0x1b0704=this[_0x505f65(0x300)]()?0x0:Graphics[_0x505f65(0x363)]-_0x561e5d,_0xef5e99=this[_0x505f65(0x254)]();return new Rectangle(_0x1b0704,_0xef5e99,_0x561e5d,_0xf63b4c);},VisuMZ[_0x5a882d(0x12e)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x34c)],Scene_Skill['prototype']['createItemWindow']=function(){const _0x2454ed=_0x5a882d;VisuMZ['SkillsStatesCore']['Scene_Skill_createItemWindow'][_0x2454ed(0x1c3)](this),this[_0x2454ed(0x32c)]()&&this[_0x2454ed(0x276)]();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xf7)]=Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x23f)],Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x23f)]=function(){const _0x4b375c=_0x5a882d;if(this[_0x4b375c(0x153)]())return this[_0x4b375c(0x367)]();else{const _0x552e97=VisuMZ[_0x4b375c(0x12e)][_0x4b375c(0xf7)][_0x4b375c(0x1c3)](this);return this[_0x4b375c(0x32c)]()&&this[_0x4b375c(0x83)]()&&(_0x552e97[_0x4b375c(0x332)]-=this['shopStatusWidth']()),_0x552e97;}},Scene_Skill['prototype']['itemWindowRectSkillsStatesCore']=function(){const _0x48373b=_0x5a882d,_0x5db4a7=Graphics['boxWidth']-this[_0x48373b(0x9f)](),_0x3bf489=this['mainAreaHeight']()-this[_0x48373b(0x2f3)]['height'],_0x230d3e=this[_0x48373b(0x300)]()?Graphics['boxWidth']-_0x5db4a7:0x0,_0x1ce5a6=this['_statusWindow']['y']+this['_statusWindow']['height'];return new Rectangle(_0x230d3e,_0x1ce5a6,_0x5db4a7,_0x3bf489);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x32c)]=function(){const _0x24e1f2=_0x5a882d;if(!Imported[_0x24e1f2(0x24b)])return![];else return this[_0x24e1f2(0x153)]()?!![]:VisuMZ[_0x24e1f2(0x12e)][_0x24e1f2(0x79)]['Skills']['ShowShopStatus'];},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x83)]=function(){const _0x49e583=_0x5a882d;return VisuMZ[_0x49e583(0x12e)]['Settings'][_0x49e583(0x37d)]['SkillSceneAdjustSkillList'];},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x276)]=function(){const _0x321512=_0x5a882d,_0x362b78=this[_0x321512(0x1a5)]();this[_0x321512(0x114)]=new Window_ShopStatus(_0x362b78),this[_0x321512(0x380)](this[_0x321512(0x114)]),this[_0x321512(0xd3)][_0x321512(0x243)](this[_0x321512(0x114)]);const _0x3024ce=VisuMZ[_0x321512(0x12e)]['Settings'][_0x321512(0x37d)][_0x321512(0x362)];this[_0x321512(0x114)][_0x321512(0x2b4)](_0x3024ce||0x0);},Scene_Skill['prototype']['shopStatusWindowRect']=function(){const _0x1d3172=_0x5a882d;return this[_0x1d3172(0x153)]()?this[_0x1d3172(0x14f)]():VisuMZ[_0x1d3172(0x12e)]['Settings'][_0x1d3172(0x37d)][_0x1d3172(0x312)][_0x1d3172(0x1c3)](this);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x14f)]=function(){const _0x117951=_0x5a882d,_0x2f82fa=this[_0x117951(0x9f)](),_0x1c9050=this[_0x117951(0xd3)][_0x117951(0x2f6)],_0xfff6cd=this['isRightInputMode']()?0x0:Graphics[_0x117951(0x363)]-this[_0x117951(0x9f)](),_0x1cf698=this['_itemWindow']['y'];return new Rectangle(_0xfff6cd,_0x1cf698,_0x2f82fa,_0x1c9050);},Scene_Skill[_0x5a882d(0x381)]['shopStatusWidth']=function(){const _0x4fe2b3=_0x5a882d;return Imported['VisuMZ_1_ItemsEquipsCore']?Scene_Shop[_0x4fe2b3(0x381)]['statusWidth']():0x0;},Scene_Skill['prototype'][_0x5a882d(0x1c0)]=function(){const _0x68b3cf=_0x5a882d;return this[_0x68b3cf(0xbd)]&&this[_0x68b3cf(0xbd)][_0x68b3cf(0x9e)]?TextManager[_0x68b3cf(0xdd)]:'';},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x295)]=Scene_Skill[_0x5a882d(0x381)]['onItemOk'],Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x2d0)]=function(){const _0x37bfd3=_0x5a882d,_0x5a2809=this['item']();DataManager[_0x37bfd3(0x146)](_0x5a2809)?this[_0x37bfd3(0x2c6)]():VisuMZ[_0x37bfd3(0x12e)][_0x37bfd3(0x295)][_0x37bfd3(0x1c3)](this);},Scene_Skill[_0x5a882d(0x381)][_0x5a882d(0x2c6)]=function(){const _0x44602f=_0x5a882d;SoundManager['playEquip']();const _0x1d7ca4=this[_0x44602f(0x16a)](),_0x290068=this[_0x44602f(0x351)]()['isSkillToggled'](_0x1d7ca4);if(!_0x290068)this['actor']()['paySkillCost'](_0x1d7ca4);this[_0x44602f(0x351)]()['setSkillToggle'](_0x1d7ca4,!_0x290068),this[_0x44602f(0xd3)][_0x44602f(0x30d)](),this[_0x44602f(0xd3)][_0x44602f(0x2eb)]();if(this[_0x44602f(0x2f3)])this[_0x44602f(0x2f3)][_0x44602f(0x30d)]();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x2fb)]=Scene_Battle[_0x5a882d(0x381)][_0x5a882d(0x1c4)],Scene_Battle['prototype'][_0x5a882d(0x1c4)]=function(){const _0x5eafa4=_0x5a882d,_0x37ef50=this[_0x5eafa4(0x178)][_0x5eafa4(0x16a)]();DataManager['isToggleSkill'](_0x37ef50)?this[_0x5eafa4(0x2c6)]():VisuMZ[_0x5eafa4(0x12e)][_0x5eafa4(0x2fb)][_0x5eafa4(0x1c3)](this);},Scene_Battle['prototype'][_0x5a882d(0x2c6)]=function(){const _0x563008=_0x5a882d;SoundManager[_0x563008(0x293)]();const _0x274264=this[_0x563008(0x178)][_0x563008(0x16a)](),_0xee3891=BattleManager[_0x563008(0x351)](),_0x28d95e=_0xee3891[_0x563008(0x10b)](_0x274264);if(!_0x28d95e)_0xee3891[_0x563008(0x311)](_0x274264);_0xee3891[_0x563008(0x1f5)](_0x274264,!_0x28d95e);if(Imported[_0x563008(0x2c4)]){let _0x3a3593=0x0;_0xee3891['isSkillToggled'](_0x274264)?_0x274264[_0x563008(0xb8)][_0x563008(0x143)](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x3a3593=Number(RegExp['$1']):_0x3a3593=_0x274264[_0x563008(0x364)]||0x0:_0x274264[_0x563008(0xb8)][_0x563008(0x143)](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x3a3593=Number(RegExp['$1']):_0x3a3593=VisuMZ[_0x563008(0x12e)][_0x563008(0x79)][_0x563008(0x102)][_0x563008(0x37a)]??0x0,_0x3a3593>0x0&&$gameTemp[_0x563008(0x10a)]([_0xee3891],_0x3a3593,![],![]);}this[_0x563008(0x178)][_0x563008(0x30d)](),this[_0x563008(0x178)][_0x563008(0x2eb)]();if(this[_0x563008(0x2f3)])this['_statusWindow'][_0x563008(0x30d)]();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1da)]=Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x2e9)],Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x2e9)]=function(){const _0x3e6a20=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x3e6a20(0x1da)]['call'](this),this[_0x3e6a20(0xef)]=null;},VisuMZ[_0x5a882d(0x12e)]['Sprite_Gauge_setup']=Sprite_Gauge['prototype']['setup'],Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x1ce)]=function(_0x3e9624,_0x59e6d9){const _0x591b5d=_0x5a882d;this[_0x591b5d(0x2e2)](_0x3e9624,_0x59e6d9),_0x59e6d9=_0x59e6d9[_0x591b5d(0x132)](),VisuMZ[_0x591b5d(0x12e)]['Sprite_Gauge_setup'][_0x591b5d(0x1c3)](this,_0x3e9624,_0x59e6d9);},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x2e2)]=function(_0x23b0a1,_0x46cf16){const _0x54e2ed=_0x5a882d,_0x5c1431=VisuMZ['SkillsStatesCore'][_0x54e2ed(0x79)]['Costs'][_0x54e2ed(0x264)](_0x3d8c12=>_0x3d8c12['Name'][_0x54e2ed(0x270)]()===_0x46cf16['toUpperCase']());_0x5c1431[_0x54e2ed(0x36d)]>=0x1?this[_0x54e2ed(0xef)]=_0x5c1431[0x0]:this[_0x54e2ed(0xef)]=null;},VisuMZ['SkillsStatesCore'][_0x5a882d(0x2d7)]=Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x10c)],Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x10c)]=function(){const _0x4c8e0b=_0x5a882d;return this[_0x4c8e0b(0x234)]&&this['_costSettings']?this[_0x4c8e0b(0x1b8)]():VisuMZ['SkillsStatesCore'][_0x4c8e0b(0x2d7)][_0x4c8e0b(0x1c3)](this);},Sprite_Gauge['prototype'][_0x5a882d(0x1b8)]=function(){const _0x311faa=_0x5a882d;return this[_0x311faa(0xef)][_0x311faa(0x35c)][_0x311faa(0x1c3)](this[_0x311faa(0x234)]);},VisuMZ[_0x5a882d(0x12e)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x5a882d(0x381)]['currentMaxValue'],Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x14a)]=function(){const _0x29ee61=_0x5a882d;return this[_0x29ee61(0x234)]&&this[_0x29ee61(0xef)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x29ee61(0x12e)]['Sprite_Gauge_currentMaxValue'][_0x29ee61(0x1c3)](this);},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x104)]=function(){const _0x183d3f=_0x5a882d;return this[_0x183d3f(0xef)][_0x183d3f(0x20e)]['call'](this['_battler']);},VisuMZ['SkillsStatesCore'][_0x5a882d(0x166)]=Sprite_Gauge['prototype']['gaugeRate'],Sprite_Gauge['prototype']['gaugeRate']=function(){const _0x29dd79=_0x5a882d,_0x332d53=VisuMZ[_0x29dd79(0x12e)]['Sprite_Gauge_gaugeRate'][_0x29dd79(0x1c3)](this);return _0x332d53['clamp'](0x0,0x1);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xcf)]=Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x168)],Sprite_Gauge[_0x5a882d(0x381)]['redraw']=function(){const _0x15aeab=_0x5a882d;this[_0x15aeab(0x234)]&&this[_0x15aeab(0xef)]?(this[_0x15aeab(0x159)][_0x15aeab(0x229)](),this[_0x15aeab(0x1be)]()):VisuMZ[_0x15aeab(0x12e)][_0x15aeab(0xcf)][_0x15aeab(0x1c3)](this);},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x2ef)]=function(){const _0x307193=_0x5a882d;let _0x390fb2=this['currentValue']();return Imported[_0x307193(0x2c4)]&&this[_0x307193(0x335)]()&&(_0x390fb2=VisuMZ['GroupDigits'](_0x390fb2)),_0x390fb2;},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x1be)]=function(){const _0x46b592=_0x5a882d;this[_0x46b592(0x159)][_0x46b592(0x229)](),this[_0x46b592(0xef)][_0x46b592(0x2e8)][_0x46b592(0x1c3)](this);},Sprite_Gauge[_0x5a882d(0x381)]['drawFullGauge']=function(_0x8d94cf,_0x5a55a9,_0x284833,_0x982a9e,_0x387f56,_0x2cb098){const _0x4ef470=_0x5a882d,_0x2e0669=this['gaugeRate'](),_0xc000c7=Math['floor']((_0x387f56-0x2)*_0x2e0669),_0x4c353b=_0x2cb098-0x2,_0x3df9b2=this[_0x4ef470(0x35b)]();this['bitmap'][_0x4ef470(0xb4)](_0x284833,_0x982a9e,_0x387f56,_0x2cb098,_0x3df9b2),this[_0x4ef470(0x159)][_0x4ef470(0x384)](_0x284833+0x1,_0x982a9e+0x1,_0xc000c7,_0x4c353b,_0x8d94cf,_0x5a55a9);},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x208)]=function(){const _0x2a1666=_0x5a882d,_0x308977=VisuMZ[_0x2a1666(0x12e)][_0x2a1666(0x79)][_0x2a1666(0x1df)];return _0x308977[_0x2a1666(0xcd)]===_0x2a1666(0x321)?$gameSystem[_0x2a1666(0x136)]():$gameSystem[_0x2a1666(0x383)]();},Sprite_Gauge['prototype'][_0x5a882d(0x291)]=function(){const _0x371864=_0x5a882d,_0x54a965=VisuMZ['SkillsStatesCore']['Settings']['Gauge'];return _0x54a965[_0x371864(0xcd)]===_0x371864(0x321)?$gameSystem[_0x371864(0xe8)]()-0x6:$gameSystem[_0x371864(0xe8)]()-0x2;},Sprite_Gauge[_0x5a882d(0x381)]['valueFontFace']=function(){const _0x405ea2=_0x5a882d,_0x2f7891=VisuMZ['SkillsStatesCore'][_0x405ea2(0x79)][_0x405ea2(0x1df)];return _0x2f7891[_0x405ea2(0x22c)]===_0x405ea2(0x321)?$gameSystem[_0x405ea2(0x136)]():$gameSystem[_0x405ea2(0x383)]();},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x13c)]=function(){const _0xd1db10=_0x5a882d,_0x55b588=VisuMZ[_0xd1db10(0x12e)][_0xd1db10(0x79)][_0xd1db10(0x1df)];return _0x55b588['ValueFontMainType']===_0xd1db10(0x321)?$gameSystem[_0xd1db10(0xe8)]()-0x6:$gameSystem[_0xd1db10(0xe8)]()-0x2;},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x11f)]=function(){const _0x2fd40f=_0x5a882d,_0x581f99=VisuMZ[_0x2fd40f(0x12e)]['Settings'][_0x2fd40f(0x1df)];if(_0x581f99[_0x2fd40f(0x269)]){if(_0x581f99[_0x2fd40f(0x2cb)]===0x1)return this[_0x2fd40f(0x33a)]();else{if(_0x581f99['MatchLabelGaugeColor']===0x2)return this[_0x2fd40f(0x20b)]();}}const _0x24cf29=_0x581f99['PresetLabelGaugeColor'];return ColorManager['getColor'](_0x24cf29);},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x19b)]=function(){const _0x8c5f7c=_0x5a882d,_0x325532=VisuMZ[_0x8c5f7c(0x12e)]['Settings'][_0x8c5f7c(0x1df)];if(this['labelOutlineWidth']()<=0x0)return _0x8c5f7c(0x1a0);else return _0x325532['LabelOutlineSolid']?_0x8c5f7c(0x281):ColorManager[_0x8c5f7c(0xd4)]();},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x259)]=function(){const _0x54340e=_0x5a882d;return VisuMZ['SkillsStatesCore'][_0x54340e(0x79)][_0x54340e(0x1df)][_0x54340e(0x379)]||0x0;},Sprite_Gauge[_0x5a882d(0x381)]['valueOutlineColor']=function(){const _0x1b1872=_0x5a882d,_0x326952=VisuMZ[_0x1b1872(0x12e)][_0x1b1872(0x79)]['Gauge'];if(this[_0x1b1872(0x26a)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x326952[_0x1b1872(0x2f4)]?_0x1b1872(0x281):ColorManager[_0x1b1872(0xd4)]();},Sprite_Gauge[_0x5a882d(0x381)][_0x5a882d(0x26a)]=function(){const _0x3efb0c=_0x5a882d;return VisuMZ[_0x3efb0c(0x12e)][_0x3efb0c(0x79)][_0x3efb0c(0x1df)][_0x3efb0c(0x26b)]||0x0;},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x28c)]=Sprite_StateIcon[_0x5a882d(0x381)]['loadBitmap'],Sprite_StateIcon[_0x5a882d(0x381)][_0x5a882d(0x16d)]=function(){const _0x5148d4=_0x5a882d;VisuMZ[_0x5148d4(0x12e)][_0x5148d4(0x28c)][_0x5148d4(0x1c3)](this),this['createTurnDisplaySprite']();},Sprite_StateIcon[_0x5a882d(0x381)][_0x5a882d(0x25b)]=function(){const _0x1220b3=_0x5a882d,_0x39353=Window_Base['prototype'][_0x1220b3(0x1d2)]();this[_0x1220b3(0x1c2)]=new Sprite(),this[_0x1220b3(0x1c2)]['bitmap']=new Bitmap(ImageManager[_0x1220b3(0x33b)],_0x39353),this[_0x1220b3(0x1c2)][_0x1220b3(0xf8)]['x']=this[_0x1220b3(0xf8)]['x'],this[_0x1220b3(0x1c2)]['anchor']['y']=this['anchor']['y'],this[_0x1220b3(0x323)](this['_turnDisplaySprite']),this['contents']=this[_0x1220b3(0x1c2)]['bitmap'];},VisuMZ['SkillsStatesCore'][_0x5a882d(0x8a)]=Sprite_StateIcon[_0x5a882d(0x381)][_0x5a882d(0xd1)],Sprite_StateIcon[_0x5a882d(0x381)][_0x5a882d(0xd1)]=function(){const _0x1b9a75=_0x5a882d;VisuMZ[_0x1b9a75(0x12e)][_0x1b9a75(0x8a)][_0x1b9a75(0x1c3)](this),this[_0x1b9a75(0x2fa)]();},Sprite_StateIcon['prototype'][_0x5a882d(0x298)]=function(_0x486f41,_0x20b6e3,_0x13ab84,_0x218b35,_0x1c85d4){const _0x2403b1=_0x5a882d;this[_0x2403b1(0x84)][_0x2403b1(0x298)](_0x486f41,_0x20b6e3,_0x13ab84,_0x218b35,this[_0x2403b1(0x84)][_0x2403b1(0x2f6)],_0x1c85d4);},Sprite_StateIcon['prototype'][_0x5a882d(0x2fa)]=function(){const _0x431b00=_0x5a882d;this[_0x431b00(0x90)](),this[_0x431b00(0x84)][_0x431b00(0x229)]();const _0x10a9fa=this['_battler'];if(!_0x10a9fa)return;const _0x354e02=_0x10a9fa['states']()[_0x431b00(0x264)](_0x35d87e=>_0x35d87e[_0x431b00(0x158)]>0x0),_0xc55bf2=[...Array(0x8)[_0x431b00(0x19a)]()][_0x431b00(0x264)](_0x18d0c6=>_0x10a9fa[_0x431b00(0x18a)](_0x18d0c6)!==0x0),_0x44c2e8=this['_animationIndex'],_0x246a2a=_0x354e02[_0x44c2e8];if(_0x246a2a)Window_Base['prototype'][_0x431b00(0x1b6)][_0x431b00(0x1c3)](this,_0x10a9fa,_0x246a2a,0x0,0x0),Window_Base['prototype']['drawActorStateData'][_0x431b00(0x1c3)](this,_0x10a9fa,_0x246a2a,0x0,0x0);else{const _0x330b24=_0xc55bf2[_0x44c2e8-_0x354e02[_0x431b00(0x36d)]];if(_0x330b24===undefined)return;Window_Base['prototype'][_0x431b00(0x2fd)][_0x431b00(0x1c3)](this,_0x10a9fa,_0x330b24,0x0,0x0),Window_Base['prototype'][_0x431b00(0x2d5)][_0x431b00(0x1c3)](this,_0x10a9fa,_0x330b24,0x0,0x0);}},Sprite_StateIcon[_0x5a882d(0x381)]['resetFontSettings']=function(){const _0x5e27eb=_0x5a882d;this[_0x5e27eb(0x84)][_0x5e27eb(0xf1)]=$gameSystem[_0x5e27eb(0x383)](),this[_0x5e27eb(0x84)][_0x5e27eb(0x34a)]=$gameSystem[_0x5e27eb(0xe8)](),this[_0x5e27eb(0x347)]();},Sprite_StateIcon[_0x5a882d(0x381)]['resetTextColor']=function(){const _0x40bd86=_0x5a882d;this[_0x40bd86(0x353)](ColorManager[_0x40bd86(0xbc)]()),this[_0x40bd86(0x37c)](ColorManager['outlineColor']());},Sprite_StateIcon['prototype']['changeTextColor']=function(_0x3145b4){const _0x17157b=_0x5a882d;this[_0x17157b(0x84)][_0x17157b(0xf2)]=_0x3145b4;},Sprite_StateIcon['prototype'][_0x5a882d(0x37c)]=function(_0x485a37){const _0x3883c4=_0x5a882d;this[_0x3883c4(0x84)]['outlineColor']=_0x485a37;},Sprite_StateIcon[_0x5a882d(0x381)][_0x5a882d(0x304)]=function(){const _0x1372a8=_0x5a882d;this['_hidden']=!![],this[_0x1372a8(0x340)]();},Window_Base['prototype'][_0x5a882d(0x2b1)]=function(_0x53277d,_0x5d5c54,_0x56f614,_0x3321ef,_0x3610b9){const _0x552376=_0x5a882d,_0x22e90=this[_0x552376(0x372)](_0x53277d,_0x5d5c54),_0x4ed4dc=this[_0x552376(0x1dc)](_0x22e90,_0x56f614,_0x3321ef,_0x3610b9),_0x199c5d=_0x56f614+_0x3610b9-_0x4ed4dc['width'];this[_0x552376(0x13e)](_0x22e90,_0x199c5d,_0x3321ef,_0x3610b9),this[_0x552376(0x90)]();},Window_Base[_0x5a882d(0x381)]['createAllSkillCostText']=function(_0x1b1c40,_0x5a94b7){const _0x7c735e=_0x5a882d;let _0x4ad13c='';for(settings of VisuMZ[_0x7c735e(0x12e)]['Settings'][_0x7c735e(0x154)]){if(!this[_0x7c735e(0x1eb)](_0x1b1c40,_0x5a94b7,settings))continue;if(_0x4ad13c[_0x7c735e(0x36d)]>0x0)_0x4ad13c+=this[_0x7c735e(0x389)]();_0x4ad13c+=this[_0x7c735e(0x1cf)](_0x1b1c40,_0x5a94b7,settings);}_0x4ad13c=this['makeAdditionalSkillCostText'](_0x1b1c40,_0x5a94b7,_0x4ad13c);if(_0x5a94b7[_0x7c735e(0xb8)][_0x7c735e(0x143)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x4ad13c[_0x7c735e(0x36d)]>0x0)_0x4ad13c+=this['skillCostSeparator']();_0x4ad13c+=String(RegExp['$1']);}return _0x4ad13c;},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x34e)]=function(_0xe1a209,_0x32d281,_0x597999){return _0x597999;},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x1eb)]=function(_0x1dcf1e,_0x1b130b,_0x374d21){const _0x49155c=_0x5a882d;let _0x74665a=_0x374d21['CalcJS'][_0x49155c(0x1c3)](_0x1dcf1e,_0x1b130b);return _0x74665a=_0x1dcf1e['adjustSkillCost'](_0x1b130b,_0x74665a,_0x374d21),_0x374d21[_0x49155c(0x2ab)][_0x49155c(0x1c3)](_0x1dcf1e,_0x1b130b,_0x74665a,_0x374d21);},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x1cf)]=function(_0x4bddb8,_0xdf1e20,_0x1bef69){const _0x134ba6=_0x5a882d;let _0x4c2d21=_0x1bef69[_0x134ba6(0x248)]['call'](_0x4bddb8,_0xdf1e20);return _0x4c2d21=_0x4bddb8[_0x134ba6(0x278)](_0xdf1e20,_0x4c2d21,_0x1bef69),_0x1bef69[_0x134ba6(0x17e)]['call'](_0x4bddb8,_0xdf1e20,_0x4c2d21,_0x1bef69);},Window_Base[_0x5a882d(0x381)]['skillCostSeparator']=function(){return'\x20';},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x2c2)]=function(_0x20b678,_0x5c5c2e,_0x21c97b,_0x195f69){const _0x48e91d=_0x5a882d;if(!_0x20b678)return;VisuMZ[_0x48e91d(0x12e)][_0x48e91d(0x11e)][_0x48e91d(0x1c3)](this,_0x20b678,_0x5c5c2e,_0x21c97b,_0x195f69),this[_0x48e91d(0xaa)](_0x20b678,_0x5c5c2e,_0x21c97b,_0x195f69);},Window_Base['prototype'][_0x5a882d(0xaa)]=function(_0x39db48,_0x19bc3a,_0x5c0ce6,_0x592707){const _0x5c17d1=_0x5a882d;_0x592707=_0x592707||0x90;const _0x4fdbb8=ImageManager[_0x5c17d1(0x125)]||0x20,_0x46ec4e=ImageManager[_0x5c17d1(0x1fe)]||0x20,_0x2c8857=_0x4fdbb8,_0x2270ea=_0x39db48[_0x5c17d1(0x28a)]()[_0x5c17d1(0x337)](0x0,Math[_0x5c17d1(0x7b)](_0x592707/_0x2c8857)),_0x1d9389=_0x39db48[_0x5c17d1(0x292)]()[_0x5c17d1(0x264)](_0x12fe9f=>_0x12fe9f[_0x5c17d1(0x158)]>0x0),_0x4d4463=[...Array(0x8)[_0x5c17d1(0x19a)]()][_0x5c17d1(0x264)](_0x1f97dd=>_0x39db48['buff'](_0x1f97dd)!==0x0),_0x1e77a3=[];let _0xc7fc50=_0x19bc3a;for(let _0x4a23a9=0x0;_0x4a23a9<_0x2270ea[_0x5c17d1(0x36d)];_0x4a23a9++){this[_0x5c17d1(0x90)]();const _0x40df17=_0x1d9389[_0x4a23a9];if(_0x40df17)!_0x1e77a3[_0x5c17d1(0x129)](_0x40df17)&&this[_0x5c17d1(0x1b6)](_0x39db48,_0x40df17,_0xc7fc50,_0x5c0ce6),this[_0x5c17d1(0x22a)](_0x39db48,_0x40df17,_0xc7fc50,_0x5c0ce6),_0x1e77a3['push'](_0x40df17);else{const _0x3a4bf4=_0x4d4463[_0x4a23a9-_0x1d9389[_0x5c17d1(0x36d)]];this['drawActorBuffTurns'](_0x39db48,_0x3a4bf4,_0xc7fc50,_0x5c0ce6),this['drawActorBuffRates'](_0x39db48,_0x3a4bf4,_0xc7fc50,_0x5c0ce6);}_0xc7fc50+=_0x2c8857;}},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x1b6)]=function(_0x3fbd8b,_0x371024,_0x44e94e,_0x364d80){const _0x54594d=_0x5a882d;if(!VisuMZ[_0x54594d(0x12e)]['Settings'][_0x54594d(0x15c)][_0x54594d(0xea)])return;if(!_0x3fbd8b[_0x54594d(0x18e)](_0x371024['id']))return;if(_0x371024['autoRemovalTiming']===0x0)return;if(_0x371024['note']['match'](/<HIDE STATE TURNS>/i))return;const _0x134619=ImageManager[_0x54594d(0x125)]||0x20,_0x5bcd83=_0x134619,_0x4ace7f=_0x3fbd8b[_0x54594d(0x19d)](_0x371024['id']),_0x127db6=ColorManager[_0x54594d(0x2da)](_0x371024);this[_0x54594d(0x353)](_0x127db6),this['changeOutlineColor'](_0x54594d(0x281)),this['contents']['fontBold']=!![],this[_0x54594d(0x84)][_0x54594d(0x34a)]=VisuMZ[_0x54594d(0x12e)][_0x54594d(0x79)][_0x54594d(0x15c)][_0x54594d(0x344)],_0x44e94e+=VisuMZ[_0x54594d(0x12e)]['Settings'][_0x54594d(0x15c)]['TurnOffsetX'],_0x364d80+=VisuMZ[_0x54594d(0x12e)][_0x54594d(0x79)][_0x54594d(0x15c)][_0x54594d(0xbe)],this['drawText'](_0x4ace7f,_0x44e94e,_0x364d80,_0x5bcd83,'right'),this[_0x54594d(0x84)][_0x54594d(0x19c)]=![],this[_0x54594d(0x90)]();},Window_Base[_0x5a882d(0x381)][_0x5a882d(0x22a)]=function(_0x1a4205,_0x4fbee7,_0x1aadd0,_0x5a07f0){const _0x1f4791=_0x5a882d;if(!VisuMZ[_0x1f4791(0x12e)][_0x1f4791(0x79)][_0x1f4791(0x15c)][_0x1f4791(0x10f)])return;const _0x39b16a=ImageManager['standardIconWidth']||0x20,_0x4de9fb=ImageManager[_0x1f4791(0x1fe)]||0x20,_0x2cca1e=_0x39b16a,_0x470f34=_0x4de9fb/0x2,_0x389d9e=ColorManager[_0x1f4791(0xbc)]();this[_0x1f4791(0x353)](_0x389d9e),this[_0x1f4791(0x37c)](_0x1f4791(0x281)),this[_0x1f4791(0x84)][_0x1f4791(0x19c)]=!![],this[_0x1f4791(0x84)][_0x1f4791(0x34a)]=VisuMZ[_0x1f4791(0x12e)][_0x1f4791(0x79)][_0x1f4791(0x15c)][_0x1f4791(0x274)],_0x1aadd0+=VisuMZ['SkillsStatesCore']['Settings'][_0x1f4791(0x15c)]['DataOffsetX'],_0x5a07f0+=VisuMZ[_0x1f4791(0x12e)][_0x1f4791(0x79)][_0x1f4791(0x15c)]['DataOffsetY'];const _0x5a3128=String(_0x1a4205[_0x1f4791(0x1f8)](_0x4fbee7['id']));this['drawText'](_0x5a3128,_0x1aadd0,_0x5a07f0,_0x2cca1e,_0x1f4791(0xc7)),this[_0x1f4791(0x84)][_0x1f4791(0x19c)]=![],this['resetFontSettings']();},Window_Base[_0x5a882d(0x381)]['drawActorBuffTurns']=function(_0x523e7c,_0x17a58c,_0x142d4b,_0x4ae003){const _0x25140f=_0x5a882d;if(!VisuMZ['SkillsStatesCore'][_0x25140f(0x79)][_0x25140f(0x25e)][_0x25140f(0xea)])return;const _0x595604=_0x523e7c[_0x25140f(0x18a)](_0x17a58c);if(_0x595604===0x0)return;const _0x341787=_0x523e7c['buffTurns'](_0x17a58c),_0x29cc5b=ImageManager[_0x25140f(0x33b)],_0x537bb0=_0x595604>0x0?ColorManager[_0x25140f(0x2ec)]():ColorManager[_0x25140f(0x230)]();this[_0x25140f(0x353)](_0x537bb0),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x25140f(0x84)][_0x25140f(0x19c)]=!![],this[_0x25140f(0x84)][_0x25140f(0x34a)]=VisuMZ[_0x25140f(0x12e)][_0x25140f(0x79)][_0x25140f(0x25e)][_0x25140f(0x344)],_0x142d4b+=VisuMZ['SkillsStatesCore']['Settings'][_0x25140f(0x25e)]['TurnOffsetX'],_0x4ae003+=VisuMZ[_0x25140f(0x12e)][_0x25140f(0x79)][_0x25140f(0x25e)][_0x25140f(0xbe)],this['drawText'](_0x341787,_0x142d4b,_0x4ae003,_0x29cc5b,_0x25140f(0x86)),this[_0x25140f(0x84)][_0x25140f(0x19c)]=![],this[_0x25140f(0x90)]();},Window_Base['prototype'][_0x5a882d(0x2d5)]=function(_0x3b72a6,_0x5bca89,_0x1aabb5,_0x1137d7){const _0x55e7e5=_0x5a882d;if(!VisuMZ[_0x55e7e5(0x12e)][_0x55e7e5(0x79)]['Buffs'][_0x55e7e5(0x10f)])return;const _0x76b17f=_0x3b72a6['paramBuffRate'](_0x5bca89),_0xb8db5a=_0x3b72a6[_0x55e7e5(0x18a)](_0x5bca89),_0x5090c5=ImageManager[_0x55e7e5(0x125)]||0x20,_0x5d3e63=ImageManager[_0x55e7e5(0x1fe)]||0x20,_0x529056=_0x5090c5,_0x2513fa=_0x5d3e63/0x2,_0x55e266=_0xb8db5a>0x0?ColorManager[_0x55e7e5(0x2ec)]():ColorManager['debuffColor']();this[_0x55e7e5(0x353)](_0x55e266),this[_0x55e7e5(0x37c)](_0x55e7e5(0x281)),this[_0x55e7e5(0x84)][_0x55e7e5(0x19c)]=!![],this['contents'][_0x55e7e5(0x34a)]=VisuMZ[_0x55e7e5(0x12e)][_0x55e7e5(0x79)]['Buffs'][_0x55e7e5(0x274)],_0x1aabb5+=VisuMZ['SkillsStatesCore'][_0x55e7e5(0x79)][_0x55e7e5(0x25e)][_0x55e7e5(0x1f1)],_0x1137d7+=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x55e7e5(0x2db)];const _0x5dad31=_0x55e7e5(0xe6)[_0x55e7e5(0x27c)](Math['round'](_0x76b17f*0x64));this[_0x55e7e5(0x298)](_0x5dad31,_0x1aabb5,_0x1137d7,_0x529056,'center'),this[_0x55e7e5(0x84)][_0x55e7e5(0x19c)]=![],this['resetFontSettings']();},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x14b)]=Window_Base['prototype'][_0x5a882d(0x353)],Window_Base[_0x5a882d(0x381)][_0x5a882d(0x353)]=function(_0x1ea6bf){const _0x2779e6=_0x5a882d;this[_0x2779e6(0x339)]&&(_0x1ea6bf=ColorManager[_0x2779e6(0x324)](VisuMZ[_0x2779e6(0x12e)][_0x2779e6(0x79)]['Toggles'][_0x2779e6(0x164)]??0x0)),VisuMZ['SkillsStatesCore']['Window_Base_changeTextColor'][_0x2779e6(0x1c3)](this,_0x1ea6bf);},VisuMZ['SkillsStatesCore'][_0x5a882d(0x27b)]=Window_Base[_0x5a882d(0x381)][_0x5a882d(0x298)],Window_Base[_0x5a882d(0x381)]['drawText']=function(_0x599ecc,_0x3e5d38,_0x3b9119,_0x1fcf26,_0xd9611d){const _0x57291f=_0x5a882d;VisuMZ[_0x57291f(0x12e)][_0x57291f(0x27b)]['call'](this,_0x599ecc,_0x3e5d38,_0x3b9119,_0x1fcf26,_0xd9611d),this[_0x57291f(0x339)]=undefined;},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x15f)]=Window_Base[_0x5a882d(0x381)][_0x5a882d(0x372)],Window_Base[_0x5a882d(0x381)]['createAllSkillCostText']=function(_0x16d311,_0x5d38b5){const _0x21e22e=_0x5a882d;let _0x4783da=VisuMZ[_0x21e22e(0x12e)]['Window_Base_createAllSkillCostText_Toggle'][_0x21e22e(0x1c3)](this,_0x16d311,_0x5d38b5);;return DataManager['isToggleSkill'](_0x5d38b5)&&_0x16d311&&(_0x16d311['isSkillToggled'](_0x5d38b5)?_0x4783da=TextManager['toggleOn']??_0x21e22e(0x1aa):(TextManager[_0x21e22e(0xd7)]===_0x21e22e(0x1c5)?_0x4783da=(TextManager[_0x21e22e(0x207)]??_0x21e22e(0x2f5))+this['skillCostSeparator']()+_0x4783da:_0x4783da=_0x4783da+this['skillCostSeparator']()+(TextManager[_0x21e22e(0x207)]??_0x21e22e(0x2f5)),_0x4783da=_0x4783da['trim']())),_0x4783da;},VisuMZ[_0x5a882d(0x12e)]['Window_StatusBase_placeGauge']=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0x5a882d(0x381)]['placeGauge']=function(_0x1a2bb3,_0x1359f4,_0x364ba4,_0x36cb6c){const _0x1a53ee=_0x5a882d;if(_0x1a2bb3[_0x1a53ee(0x2dd)]())_0x1359f4=this[_0x1a53ee(0x191)](_0x1a2bb3,_0x1359f4);this['placeExactGauge'](_0x1a2bb3,_0x1359f4,_0x364ba4,_0x36cb6c);},Window_StatusBase[_0x5a882d(0x381)]['placeExactGauge']=function(_0x5d6fdc,_0x33726e,_0x53d14d,_0x5f357d){const _0x2064a6=_0x5a882d;if([_0x2064a6(0x299),_0x2064a6(0x23e)]['includes'](_0x33726e[_0x2064a6(0x132)]()))return;VisuMZ['SkillsStatesCore'][_0x2064a6(0x1f9)][_0x2064a6(0x1c3)](this,_0x5d6fdc,_0x33726e,_0x53d14d,_0x5f357d);},Window_StatusBase[_0x5a882d(0x381)][_0x5a882d(0x191)]=function(_0x19fcd8,_0x4d8570){const _0x28fd3c=_0x5a882d,_0x46b575=_0x19fcd8['currentClass']()[_0x28fd3c(0xb8)];if(_0x4d8570==='hp'&&_0x46b575[_0x28fd3c(0x143)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x4d8570==='mp'&&_0x46b575['match'](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x4d8570==='tp'&&_0x46b575[_0x28fd3c(0x143)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x4d8570;}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x11e)]=Window_StatusBase['prototype']['drawActorIcons'],Window_StatusBase[_0x5a882d(0x381)][_0x5a882d(0x2c2)]=function(_0x1192ca,_0x102b0a,_0x1d29c5,_0x3cd2ff){const _0x334442=_0x5a882d;if(!_0x1192ca)return;Window_Base['prototype'][_0x334442(0x2c2)]['call'](this,_0x1192ca,_0x102b0a,_0x1d29c5,_0x3cd2ff);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xd5)]=Window_SkillType[_0x5a882d(0x381)]['initialize'],Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x1ae)]=function(_0x494978){const _0x148d6c=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x148d6c(0xd5)]['call'](this,_0x494978),this[_0x148d6c(0x27e)](_0x494978);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0xa623e1){const _0x3e8c83=_0x5a882d,_0x15ce55=new Rectangle(0x0,0x0,_0xa623e1[_0x3e8c83(0x332)],_0xa623e1[_0x3e8c83(0x2f6)]);this['_commandNameWindow']=new Window_Base(_0x15ce55),this['_commandNameWindow'][_0x3e8c83(0xde)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0x3e8c83(0x13a)]();},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x309)]=function(){const _0x1e32ef=_0x5a882d;Window_Command[_0x1e32ef(0x381)][_0x1e32ef(0x309)][_0x1e32ef(0x1c3)](this);if(this[_0x1e32ef(0x219)])this[_0x1e32ef(0x13a)]();},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x13a)]=function(){const _0x382df6=_0x5a882d,_0x487e49=this[_0x382df6(0x219)];_0x487e49[_0x382df6(0x84)][_0x382df6(0x229)]();const _0x592d6b=this[_0x382df6(0x203)](this[_0x382df6(0x356)]());if(_0x592d6b===_0x382df6(0x7d)&&this[_0x382df6(0x142)]()>0x0){const _0x1f9447=this['itemLineRect'](this[_0x382df6(0x356)]());let _0x573929=this['commandName'](this[_0x382df6(0x356)]());_0x573929=_0x573929['replace'](/\\I\[(\d+)\]/gi,''),_0x487e49['resetFontSettings'](),this['commandNameWindowDrawBackground'](_0x573929,_0x1f9447),this[_0x382df6(0x16e)](_0x573929,_0x1f9447),this[_0x382df6(0x32a)](_0x573929,_0x1f9447);}},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x205)]=function(_0x34746f,_0x268722){},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x16e)]=function(_0x5f418b,_0x5b64c7){const _0x89bd15=_0x5a882d,_0x431287=this[_0x89bd15(0x219)];_0x431287[_0x89bd15(0x298)](_0x5f418b,0x0,_0x5b64c7['y'],_0x431287[_0x89bd15(0x11c)],_0x89bd15(0xc7));},Window_SkillType['prototype'][_0x5a882d(0x32a)]=function(_0x585871,_0x279e5e){const _0x16f77c=_0x5a882d,_0xbed120=this[_0x16f77c(0x219)],_0x25e91=$gameSystem[_0x16f77c(0x190)](),_0x14386d=_0x279e5e['x']+Math[_0x16f77c(0x7b)](_0x279e5e[_0x16f77c(0x332)]/0x2)+_0x25e91;_0xbed120['x']=_0xbed120[_0x16f77c(0x332)]/-0x2+_0x14386d,_0xbed120['y']=Math[_0x16f77c(0x7b)](_0x279e5e[_0x16f77c(0x2f6)]/0x2);},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x34f)]=function(){const _0x468693=_0x5a882d;return Imported[_0x468693(0x2c4)]&&Window_Command[_0x468693(0x381)][_0x468693(0x34f)]['call'](this);},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x24c)]=function(){const _0x173ead=_0x5a882d;if(!this[_0x173ead(0xab)])return;const _0x226a82=this[_0x173ead(0xab)][_0x173ead(0x1d8)]();for(const _0x331c89 of _0x226a82){const _0x29ed88=this[_0x173ead(0x141)](_0x331c89);this['addCommand'](_0x29ed88,_0x173ead(0x330),!![],_0x331c89);}},Window_SkillType['prototype'][_0x5a882d(0x141)]=function(_0x763bd1){const _0x4f749f=_0x5a882d;let _0x73eed6=$dataSystem['skillTypes'][_0x763bd1];if(_0x73eed6['match'](/\\I\[(\d+)\]/i))return _0x73eed6;if(this['commandStyle']()===_0x4f749f(0x7a))return _0x73eed6;const _0x45a53a=VisuMZ['SkillsStatesCore'][_0x4f749f(0x79)][_0x4f749f(0x37d)],_0x2637e4=$dataSystem['magicSkills'][_0x4f749f(0x129)](_0x763bd1),_0xfe9be1=_0x2637e4?_0x45a53a[_0x4f749f(0x212)]:_0x45a53a[_0x4f749f(0x12f)];return _0x4f749f(0x1a1)[_0x4f749f(0x27c)](_0xfe9be1,_0x73eed6);},Window_SkillType['prototype'][_0x5a882d(0x31f)]=function(){const _0x1bb674=_0x5a882d;return VisuMZ[_0x1bb674(0x12e)][_0x1bb674(0x79)]['Skills'][_0x1bb674(0x213)];},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0xb5)]=function(_0x4d8e02){const _0x2aec17=_0x5a882d,_0x20dfa1=this[_0x2aec17(0x203)](_0x4d8e02);if(_0x20dfa1==='iconText')this['drawItemStyleIconText'](_0x4d8e02);else _0x20dfa1===_0x2aec17(0x7d)?this[_0x2aec17(0x187)](_0x4d8e02):Window_Command[_0x2aec17(0x381)]['drawItem'][_0x2aec17(0x1c3)](this,_0x4d8e02);},Window_SkillType['prototype'][_0x5a882d(0x2cd)]=function(){const _0x428ae2=_0x5a882d;return VisuMZ['SkillsStatesCore'][_0x428ae2(0x79)][_0x428ae2(0x37d)][_0x428ae2(0x13f)];},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x203)]=function(_0x3471f6){const _0x142343=_0x5a882d;if(_0x3471f6<0x0)return'text';const _0xe63f07=this['commandStyle']();if(_0xe63f07!==_0x142343(0x2ca))return _0xe63f07;else{if(this[_0x142343(0x142)]()>0x0){const _0x3c7d16=this[_0x142343(0x357)](_0x3471f6);if(_0x3c7d16[_0x142343(0x143)](/\\I\[(\d+)\]/i)){const _0xdec705=this[_0x142343(0x1d3)](_0x3471f6),_0x487c05=this[_0x142343(0x1dc)](_0x3c7d16)[_0x142343(0x332)];return _0x487c05<=_0xdec705[_0x142343(0x332)]?_0x142343(0x172):_0x142343(0x7d);}}}return _0x142343(0x7a);},Window_SkillType['prototype'][_0x5a882d(0x1d7)]=function(_0x48c3b8){const _0x4ff25c=_0x5a882d,_0x468a60=this[_0x4ff25c(0x1d3)](_0x48c3b8),_0x5ede41=this[_0x4ff25c(0x357)](_0x48c3b8),_0x15b2f4=this[_0x4ff25c(0x1dc)](_0x5ede41)[_0x4ff25c(0x332)];this[_0x4ff25c(0x232)](this[_0x4ff25c(0x246)](_0x48c3b8));const _0x1066a5=this[_0x4ff25c(0x31f)]();if(_0x1066a5===_0x4ff25c(0x86))this[_0x4ff25c(0x13e)](_0x5ede41,_0x468a60['x']+_0x468a60[_0x4ff25c(0x332)]-_0x15b2f4,_0x468a60['y'],_0x15b2f4);else{if(_0x1066a5===_0x4ff25c(0xc7)){const _0x541e91=_0x468a60['x']+Math[_0x4ff25c(0x7b)]((_0x468a60['width']-_0x15b2f4)/0x2);this[_0x4ff25c(0x13e)](_0x5ede41,_0x541e91,_0x468a60['y'],_0x15b2f4);}else this[_0x4ff25c(0x13e)](_0x5ede41,_0x468a60['x'],_0x468a60['y'],_0x15b2f4);}},Window_SkillType[_0x5a882d(0x381)][_0x5a882d(0x187)]=function(_0x2bf08c){const _0x1a7fe0=_0x5a882d;this[_0x1a7fe0(0x357)](_0x2bf08c)[_0x1a7fe0(0x143)](/\\I\[(\d+)\]/i);const _0x253797=Number(RegExp['$1'])||0x0,_0x440dec=this['itemLineRect'](_0x2bf08c),_0x4d182b=_0x440dec['x']+Math[_0x1a7fe0(0x7b)]((_0x440dec['width']-ImageManager['iconWidth'])/0x2),_0x298305=_0x440dec['y']+(_0x440dec[_0x1a7fe0(0x2f6)]-ImageManager[_0x1a7fe0(0x85)])/0x2;this[_0x1a7fe0(0x373)](_0x253797,_0x4d182b,_0x298305);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1e3)]=Window_SkillStatus[_0x5a882d(0x381)][_0x5a882d(0x30d)],Window_SkillStatus['prototype'][_0x5a882d(0x30d)]=function(){const _0x1c3029=_0x5a882d;VisuMZ['SkillsStatesCore'][_0x1c3029(0x1e3)][_0x1c3029(0x1c3)](this);if(this[_0x1c3029(0xab)])this[_0x1c3029(0x140)]();},Window_SkillStatus['prototype'][_0x5a882d(0x140)]=function(){const _0x526115=_0x5a882d;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0x526115(0x249)])return;const _0x28d32e=this[_0x526115(0x35a)]();let _0x118059=this[_0x526115(0xa0)]()/0x2+0xb4+0xb4+0xb4,_0xc9ab81=this[_0x526115(0x11c)]-_0x118059-0x2;if(_0xc9ab81>=0x12c){const _0x1afd01=VisuMZ[_0x526115(0x325)]['Settings']['Param']['DisplayedParams'],_0x347a9e=Math[_0x526115(0x7b)](_0xc9ab81/0x2)-0x18;let _0x4c96ed=_0x118059,_0x423ca0=Math['floor']((this['innerHeight']-Math[_0x526115(0x334)](_0x1afd01[_0x526115(0x36d)]/0x2)*_0x28d32e)/0x2),_0x235da5=0x0;for(const _0x1d5329 of _0x1afd01){this[_0x526115(0x2a4)](_0x4c96ed,_0x423ca0,_0x347a9e,_0x1d5329),_0x235da5++,_0x235da5%0x2===0x0?(_0x4c96ed=_0x118059,_0x423ca0+=_0x28d32e):_0x4c96ed+=_0x347a9e+0x18;}}this[_0x526115(0x90)]();},Window_SkillStatus['prototype']['drawExtendedParameter']=function(_0x55c2df,_0x2286da,_0x5db126,_0x3d363f){const _0x5b0875=_0x5a882d,_0x260b7d=this[_0x5b0875(0x35a)]();this[_0x5b0875(0x90)](),this['drawParamText'](_0x55c2df,_0x2286da,_0x5db126,_0x3d363f,!![]),this[_0x5b0875(0x347)](),this['contents'][_0x5b0875(0x34a)]-=0x8;const _0x5c517e=this[_0x5b0875(0xab)][_0x5b0875(0x206)](_0x3d363f,!![]);this[_0x5b0875(0x84)][_0x5b0875(0x298)](_0x5c517e,_0x55c2df,_0x2286da,_0x5db126,_0x260b7d,'right');},VisuMZ[_0x5a882d(0x12e)]['Window_SkillList_includes']=Window_SkillList[_0x5a882d(0x381)]['includes'],Window_SkillList['prototype'][_0x5a882d(0x129)]=function(_0x3e9087){const _0x1fed08=_0x5a882d;if(this[_0x1fed08(0xdf)]<=0x0)return![];return this[_0x1fed08(0x2a8)](_0x3e9087);},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xb9)]=Window_SkillList['prototype'][_0x5a882d(0x130)],Window_SkillList[_0x5a882d(0x381)]['maxCols']=function(){const _0x136fa0=_0x5a882d;return SceneManager[_0x136fa0(0x12d)][_0x136fa0(0x193)]===Scene_Battle?VisuMZ[_0x136fa0(0x12e)][_0x136fa0(0xb9)][_0x136fa0(0x1c3)](this):VisuMZ['SkillsStatesCore'][_0x136fa0(0x79)][_0x136fa0(0x37d)]['ListWindowCols'];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x32e)]=Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x2c3)],Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x2c3)]=function(_0x5597c4){const _0x2b8947=_0x5a882d,_0x1b9773=this[_0x2b8947(0xab)]!==_0x5597c4;VisuMZ[_0x2b8947(0x12e)][_0x2b8947(0x32e)][_0x2b8947(0x1c3)](this,_0x5597c4),_0x1b9773&&(this[_0x2b8947(0x2f3)]&&this[_0x2b8947(0x2f3)][_0x2b8947(0x193)]===Window_ShopStatus&&this[_0x2b8947(0x2f3)][_0x2b8947(0x204)](this[_0x2b8947(0x279)](0x0)));},Window_SkillList['prototype'][_0x5a882d(0x200)]=function(_0x2db15a){const _0x298c44=_0x5a882d;if(this[_0x298c44(0xdf)]===_0x2db15a)return;if(!_0x2db15a)return;this[_0x298c44(0xdf)]=_0x2db15a,this[_0x298c44(0x30d)](),this[_0x298c44(0x286)](0x0,0x0),this['_statusWindow']&&this['_statusWindow'][_0x298c44(0x193)]===Window_ShopStatus&&this[_0x298c44(0x2f3)][_0x298c44(0x204)](this[_0x298c44(0x279)](0x0));},Window_SkillList[_0x5a882d(0x381)]['includesSkillsStatesCore']=function(_0x347335){const _0x42d108=_0x5a882d;if(!_0x347335)return VisuMZ[_0x42d108(0x12e)][_0x42d108(0x15e)][_0x42d108(0x1c3)](this,_0x347335);if(!this[_0x42d108(0x336)](_0x347335))return![];if(!this['checkShowHideNotetags'](_0x347335))return![];if(!this[_0x42d108(0xe9)](_0x347335))return![];return!![];},Window_SkillList[_0x5a882d(0x381)]['checkSkillTypeMatch']=function(_0x18c048){const _0x357491=_0x5a882d;return DataManager['getSkillTypes'](_0x18c048)[_0x357491(0x129)](this[_0x357491(0xdf)]);},Window_SkillList[_0x5a882d(0x381)]['checkShowHideNotetags']=function(_0x1f2494){const _0x1dd281=_0x5a882d;if(!VisuMZ[_0x1dd281(0x12e)]['CheckVisibleBattleNotetags'](this[_0x1dd281(0xab)],_0x1f2494))return![];if(!VisuMZ[_0x1dd281(0x12e)][_0x1dd281(0x1fd)](this[_0x1dd281(0xab)],_0x1f2494))return![];if(!VisuMZ[_0x1dd281(0x12e)][_0x1dd281(0x186)](this['_actor'],_0x1f2494))return![];return!![];},VisuMZ['SkillsStatesCore']['CheckVisibleBattleNotetags']=function(_0x33a4e8,_0x7d7545){const _0x63554b=_0x5a882d,_0x2e77bb=_0x7d7545['note'];if(_0x2e77bb[_0x63554b(0x143)](/<HIDE IN BATTLE>/i)&&$gameParty[_0x63554b(0xd2)]())return![];else return _0x2e77bb[_0x63554b(0x143)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x63554b(0xd2)]()?![]:!![];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x1fd)]=function(_0x40c5fb,_0x3d9c0c){const _0x3f3953=_0x5a882d,_0x2386a1=_0x3d9c0c['note'];if(_0x2386a1[_0x3f3953(0x143)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x226a36=JSON[_0x3f3953(0x189)]('['+RegExp['$1'][_0x3f3953(0x143)](/\d+/g)+']');for(const _0x4e979b of _0x226a36){if(!$gameSwitches[_0x3f3953(0x220)](_0x4e979b))return![];}return!![];}if(_0x2386a1[_0x3f3953(0x143)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4db7bc=JSON[_0x3f3953(0x189)]('['+RegExp['$1'][_0x3f3953(0x143)](/\d+/g)+']');for(const _0x5522b4 of _0x4db7bc){if(!$gameSwitches[_0x3f3953(0x220)](_0x5522b4))return![];}return!![];}if(_0x2386a1[_0x3f3953(0x143)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2345a3=JSON[_0x3f3953(0x189)]('['+RegExp['$1'][_0x3f3953(0x143)](/\d+/g)+']');for(const _0x29e2dd of _0x2345a3){if($gameSwitches[_0x3f3953(0x220)](_0x29e2dd))return!![];}return![];}if(_0x2386a1[_0x3f3953(0x143)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x498d80=JSON[_0x3f3953(0x189)]('['+RegExp['$1'][_0x3f3953(0x143)](/\d+/g)+']');for(const _0x5ef78b of _0x498d80){if(!$gameSwitches[_0x3f3953(0x220)](_0x5ef78b))return!![];}return![];}if(_0x2386a1[_0x3f3953(0x143)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x57b02a=JSON['parse']('['+RegExp['$1'][_0x3f3953(0x143)](/\d+/g)+']');for(const _0x52e810 of _0x57b02a){if(!$gameSwitches[_0x3f3953(0x220)](_0x52e810))return!![];}return![];}if(_0x2386a1['match'](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1d4f6a=JSON[_0x3f3953(0x189)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x94b48d of _0x1d4f6a){if($gameSwitches[_0x3f3953(0x220)](_0x94b48d))return![];}return!![];}return!![];},VisuMZ['SkillsStatesCore'][_0x5a882d(0x186)]=function(_0x54652e,_0x25031b){const _0x43f415=_0x5a882d,_0x5323a6=_0x25031b[_0x43f415(0xb8)];if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c9a81=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x4b3337 of _0x1c9a81){if(!_0x54652e['isLearnedSkill'](_0x4b3337))return![];}return!![];}else{if(_0x5323a6['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2378a4=RegExp['$1']['split'](',');for(const _0xb8c84e of _0x2378a4){const _0x4c60d5=DataManager[_0x43f415(0xce)](_0xb8c84e);if(!_0x4c60d5)continue;if(!_0x54652e[_0x43f415(0x1e2)](_0x4c60d5))return![];}return!![];}}if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e98b0=JSON[_0x43f415(0x189)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1e9383 of _0x3e98b0){if(!_0x54652e[_0x43f415(0x1e2)](_0x1e9383))return![];}return!![];}else{if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x17b193=RegExp['$1'][_0x43f415(0x105)](',');for(const _0xe47326 of _0x17b193){const _0x89ab36=DataManager[_0x43f415(0xce)](_0xe47326);if(!_0x89ab36)continue;if(!_0x54652e[_0x43f415(0x1e2)](_0x89ab36))return![];}return!![];}}if(_0x5323a6['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5475bb=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x346805 of _0x5475bb){if(_0x54652e[_0x43f415(0x1e2)](_0x346805))return!![];}return![];}else{if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e8246=RegExp['$1'][_0x43f415(0x105)](',');for(const _0xc9349c of _0x1e8246){const _0x46c64c=DataManager[_0x43f415(0xce)](_0xc9349c);if(!_0x46c64c)continue;if(_0x54652e[_0x43f415(0x1e2)](_0x46c64c))return!![];}return![];}}if(_0x5323a6['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d4d75=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x540e11 of _0x3d4d75){if(!_0x54652e[_0x43f415(0x1e2)](_0x540e11))return!![];}return![];}else{if(_0x5323a6['match'](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3bf0cf=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x1f0ff9 of _0x3bf0cf){const _0x4318ea=DataManager[_0x43f415(0xce)](_0x1f0ff9);if(!_0x4318ea)continue;if(!_0x54652e[_0x43f415(0x1e2)](_0x4318ea))return!![];}return![];}}if(_0x5323a6['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4596c6=JSON['parse']('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x50833d of _0x4596c6){if(!_0x54652e['isLearnedSkill'](_0x50833d))return!![];}return![];}else{if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5944c4=RegExp['$1']['split'](',');for(const _0x1969ce of _0x5944c4){const _0x42f26c=DataManager[_0x43f415(0xce)](_0x1969ce);if(!_0x42f26c)continue;if(!_0x54652e[_0x43f415(0x1e2)](_0x42f26c))return!![];}return![];}}if(_0x5323a6['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x498763=JSON['parse']('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x32b2df of _0x498763){if(_0x54652e[_0x43f415(0x1e2)](_0x32b2df))return![];}return!![];}else{if(_0x5323a6['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x48c66e=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x594581 of _0x48c66e){const _0x34bc79=DataManager[_0x43f415(0xce)](_0x594581);if(!_0x34bc79)continue;if(_0x54652e[_0x43f415(0x1e2)](_0x34bc79))return![];}return!![];}}if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xcc596=JSON[_0x43f415(0x189)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3c185c of _0xcc596){if(!_0x54652e['hasSkill'](_0x3c185c))return![];}return!![];}else{if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x492c23=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x505c08 of _0x492c23){const _0x527a7e=DataManager['getSkillIdWithName'](_0x505c08);if(!_0x527a7e)continue;if(!_0x54652e[_0x43f415(0x1bc)](_0x527a7e))return![];}return!![];}}if(_0x5323a6['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x335c5f=JSON['parse']('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x3eed4b of _0x335c5f){if(!_0x54652e[_0x43f415(0x1bc)](_0x3eed4b))return![];}return!![];}else{if(_0x5323a6[_0x43f415(0x143)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4a82cd=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x2ee362 of _0x4a82cd){const _0x59f932=DataManager['getSkillIdWithName'](_0x2ee362);if(!_0x59f932)continue;if(!_0x54652e[_0x43f415(0x1bc)](_0x59f932))return![];}return!![];}}if(_0x5323a6['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x556122=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x2abc5d of _0x556122){if(_0x54652e['hasSkill'](_0x2abc5d))return!![];}return![];}else{if(_0x5323a6['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x9153db=RegExp['$1']['split'](',');for(const _0x47c40d of _0x9153db){const _0x4ddf32=DataManager[_0x43f415(0xce)](_0x47c40d);if(!_0x4ddf32)continue;if(_0x54652e[_0x43f415(0x1bc)](_0x4ddf32))return!![];}return![];}}if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ad972=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x46f7e0 of _0x5ad972){if(!_0x54652e['hasSkill'](_0x46f7e0))return!![];}return![];}else{if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xc8ebfe=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x5001b5 of _0xc8ebfe){const _0x5d18d=DataManager[_0x43f415(0xce)](_0x5001b5);if(!_0x5d18d)continue;if(!_0x54652e[_0x43f415(0x1bc)](_0x5d18d))return!![];}return![];}}if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x97271b=JSON['parse']('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x2e0659 of _0x97271b){if(!_0x54652e[_0x43f415(0x1bc)](_0x2e0659))return!![];}return![];}else{if(_0x5323a6['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5a57ab=RegExp['$1'][_0x43f415(0x105)](',');for(const _0xf21178 of _0x5a57ab){const _0x3dbabf=DataManager[_0x43f415(0xce)](_0xf21178);if(!_0x3dbabf)continue;if(!_0x54652e[_0x43f415(0x1bc)](_0x3dbabf))return!![];}return![];}}if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x113223=JSON[_0x43f415(0x189)]('['+RegExp['$1'][_0x43f415(0x143)](/\d+/g)+']');for(const _0x529b7b of _0x113223){if(_0x54652e[_0x43f415(0x1bc)](_0x529b7b))return![];}return!![];}else{if(_0x5323a6[_0x43f415(0x143)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x11e56c=RegExp['$1'][_0x43f415(0x105)](',');for(const _0x103697 of _0x11e56c){const _0x29d183=DataManager[_0x43f415(0xce)](_0x103697);if(!_0x29d183)continue;if(_0x54652e[_0x43f415(0x1bc)](_0x29d183))return![];}return!![];}}return!![];},Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0xe9)]=function(_0x25ee79){const _0x3574a9=_0x5a882d,_0x817d25=_0x25ee79[_0x3574a9(0xb8)],_0x370df2=VisuMZ[_0x3574a9(0x12e)][_0x3574a9(0x2c7)];return _0x370df2[_0x25ee79['id']]?_0x370df2[_0x25ee79['id']][_0x3574a9(0x1c3)](this,_0x25ee79):!![];},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0xee)]=Window_SkillList['prototype'][_0x5a882d(0x173)],Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x173)]=function(){const _0x213629=_0x5a882d;VisuMZ['SkillsStatesCore']['Window_SkillList_makeItemList'][_0x213629(0x1c3)](this),this[_0x213629(0x155)]()&&this['sortSkillList'](),this[_0x213629(0x307)]()&&this[_0x213629(0x210)]();},Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x155)]=function(){return!![];},Window_SkillList['prototype']['sortSkillList']=function(){const _0x4ca3a6=_0x5a882d,_0x3cb7a2=VisuMZ[_0x4ca3a6(0x12e)][_0x4ca3a6(0x79)][_0x4ca3a6(0x37d)]['SortSkillTypesAbc']||[];return _0x3cb7a2&&_0x3cb7a2[_0x4ca3a6(0x129)](this[_0x4ca3a6(0xdf)])?this[_0x4ca3a6(0x110)][_0x4ca3a6(0x121)]((_0x2f0e5c,_0x54aa3f)=>{const _0x56e004=_0x4ca3a6;if(!!_0x2f0e5c&&!!_0x54aa3f)return _0x2f0e5c['name'][_0x56e004(0x2b8)](_0x54aa3f[_0x56e004(0x38b)]);return 0x0;}):VisuMZ['SkillsStatesCore'][_0x4ca3a6(0x118)](this[_0x4ca3a6(0x110)]),this[_0x4ca3a6(0x110)];},VisuMZ[_0x5a882d(0x12e)]['SortByIDandPriority']=function(_0x45cb1e){return _0x45cb1e['sort']((_0x1d8b31,_0x4633b4)=>{const _0x188701=_0x1123;if(!!_0x1d8b31&&!!_0x4633b4){if(_0x1d8b31[_0x188701(0x36c)]===undefined)VisuMZ[_0x188701(0x12e)][_0x188701(0x1b2)](_0x1d8b31);if(_0x4633b4[_0x188701(0x36c)]===undefined)VisuMZ[_0x188701(0x12e)][_0x188701(0x1b2)](_0x4633b4);const _0xaf9d6a=_0x1d8b31[_0x188701(0x36c)],_0x594481=_0x4633b4[_0x188701(0x36c)];if(_0xaf9d6a!==_0x594481)return _0x594481-_0xaf9d6a;return _0x1d8b31['id']-_0x4633b4['id'];}return 0x0;}),_0x45cb1e;},VisuMZ[_0x5a882d(0x12e)]['SortByIDandPriorityUsingIDs']=function(_0xb3cde5){const _0x382f89=_0x5a882d;return _0xb3cde5[_0x382f89(0x121)]((_0x312a70,_0x3519c5)=>{const _0xc16c5d=_0x382f89,_0x822144=$dataSkills[_0x312a70],_0x22f97a=$dataSkills[_0x3519c5];if(!!_0x822144&&!!_0x22f97a){if(_0x822144[_0xc16c5d(0x36c)]===undefined)VisuMZ['SkillsStatesCore'][_0xc16c5d(0x1b2)](_0x822144);if(_0x22f97a['sortPriority']===undefined)VisuMZ[_0xc16c5d(0x12e)][_0xc16c5d(0x1b2)](_0x22f97a);const _0x543d58=_0x822144[_0xc16c5d(0x36c)],_0x23907f=_0x22f97a[_0xc16c5d(0x36c)];if(_0x543d58!==_0x23907f)return _0x23907f-_0x543d58;return _0x312a70-_0x3519c5;}return 0x0;}),_0xb3cde5;},Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x307)]=function(){const _0x59153a=_0x5a882d;if(!this['_actor'])return![];if([_0x59153a(0x91),'equipBattleSkills',_0x59153a(0xc6)][_0x59153a(0x129)](this[_0x59153a(0xdf)]))return![];return!![];},Window_SkillList[_0x5a882d(0x381)]['changeSkillsThroughStateEffects']=function(){const _0x4f12a4=_0x5a882d,_0x1f4b10=this[_0x4f12a4(0xab)][_0x4f12a4(0x292)]();for(const _0x43a1e3 of _0x1f4b10){const _0x175c6b=DataManager[_0x4f12a4(0x1a6)](_0x43a1e3);for(const _0x425dd9 in _0x175c6b){const _0x2c2b8b=$dataSkills[Number(_0x425dd9)]||null,_0x121fea=$dataSkills[Number(_0x175c6b[_0x425dd9])]||null;while(this[_0x4f12a4(0x110)]['includes'](_0x2c2b8b)){const _0xe3506f=this['_data'][_0x4f12a4(0x22d)](_0x2c2b8b);this[_0x4f12a4(0x110)][_0xe3506f]=_0x121fea;}}}},VisuMZ[_0x5a882d(0x12e)][_0x5a882d(0x21c)]=Window_SkillList['prototype'][_0x5a882d(0xb5)],Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0xb5)]=function(_0x30d96d){const _0xa64252=_0x5a882d,_0x60be49=this[_0xa64252(0x279)](_0x30d96d),_0x4db929=_0x60be49?_0x60be49['name']:'';if(_0x60be49)this[_0xa64252(0x29e)](_0x60be49);DataManager[_0xa64252(0x146)](_0x60be49)&&this['_actor']&&this[_0xa64252(0xab)][_0xa64252(0x10b)](_0x60be49)&&(this[_0xa64252(0x339)]=!![]);VisuMZ[_0xa64252(0x12e)]['Window_SkillList_drawItem']['call'](this,_0x30d96d),this[_0xa64252(0x339)]=undefined;if(_0x60be49)_0x60be49[_0xa64252(0x38b)]=_0x4db929;},Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x29e)]=function(_0x452b9c){const _0x39f8cd=_0x5a882d;if(_0x452b9c&&_0x452b9c[_0x39f8cd(0xb8)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x452b9c[_0x39f8cd(0x38b)]=String(RegExp['$1'])[_0x39f8cd(0x355)]();for(;;){if(_0x452b9c['name'][_0x39f8cd(0x143)](/\\V\[(\d+)\]/gi))_0x452b9c[_0x39f8cd(0x38b)]=_0x452b9c[_0x39f8cd(0x38b)][_0x39f8cd(0x2b6)](/\\V\[(\d+)\]/gi,(_0x1bfdda,_0x24a225)=>$gameVariables[_0x39f8cd(0x220)](parseInt(_0x24a225)));else break;}}},Window_SkillList[_0x5a882d(0x381)]['drawSkillCost']=function(_0x29e82c,_0x289434,_0x20bd17,_0x37ef4d){const _0x2ab231=_0x5a882d;Window_Base[_0x2ab231(0x381)][_0x2ab231(0x2b1)]['call'](this,this[_0x2ab231(0xab)],_0x29e82c,_0x289434,_0x20bd17,_0x37ef4d);},Window_SkillList[_0x5a882d(0x381)][_0x5a882d(0x243)]=function(_0x38d094){const _0x1c078c=_0x5a882d;this[_0x1c078c(0x2f3)]=_0x38d094,this[_0x1c078c(0x309)]();},VisuMZ['SkillsStatesCore']['Window_SkillList_updateHelp']=Window_SkillList[_0x5a882d(0x381)]['updateHelp'],Window_SkillList['prototype'][_0x5a882d(0x24a)]=function(){const _0x928267=_0x5a882d;VisuMZ[_0x928267(0x12e)]['Window_SkillList_updateHelp'][_0x928267(0x1c3)](this),this[_0x928267(0x2f3)]&&this['_statusWindow'][_0x928267(0x193)]===Window_ShopStatus&&this[_0x928267(0x2f3)][_0x928267(0x204)](this[_0x928267(0x16a)]());};