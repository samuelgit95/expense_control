import Text "mo:base/Text";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
actor records {
  type Entry = {
    date: Text;
    description: Text;
    category: Text;
    value: Float
  };

  var entries = HashMap.HashMap<Nat, Entry>(1, Nat.equal, Hash.hash);

  stable var entriesIdCount: Nat = 0;

  public func createEntry (entry: Entry) : async () {

    let id : Nat = entriesIdCount;
    entriesIdCount += 1;

    entries.put(id, entry);
  };

  public query func readEntry (id : Nat) : async ?Entry {
    let entryRes : ?Entry = entries.get(id);
    return entryRes;
  };


  public func updateEntry (id : Nat, entry : Entry) : async Text {
    let entryRes : ?Entry = entries.get(id);
    switch (entryRes) {
      case (null) {
        "Entry don't exist";
      };
      case (?currentEntry) {
        let updatedEntry : Entry = {
          date = entry.date;
          description = entry.description;
          category = entry.category;
          value = entry.value;
        };
        entries.put(id, updatedEntry);
        "Updated successfully";
      };
    };

  };

  public func removeEntry (id : Nat) : async Text {
    let entryRes : ?Entry = entries.get(id);
    switch (entryRes) {
      case (null) {
        "Entry don't exist";
      };
      case (_) {
        ignore entries.remove(id);
        "Entry removed";
      };
    };
  };

};
