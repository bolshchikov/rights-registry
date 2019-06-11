package main

import (
	"bytes"
	"encoding/json"
	"time"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/address"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(register, get)
var SYSTEM = sdk.Export(_init)

type Record struct {
	Blob      string
	Timestamp uint64
	Signer    []byte
}

func _init() {

}

func register(id string, record string) (timestamp uint64, signer []byte) {
	key := []byte(id)
	if !bytes.Equal(state.ReadBytes(key), nil) {
		panic("Record already exists")
	}
	timestamp = uint64(time.Now().Unix())
	signer = address.GetSignerAddress()
	encoded, _ := json.Marshal(&Record{
		Blob:      record,
		Timestamp: timestamp,
		Signer:    signer,
	})
	state.WriteBytes(key, encoded)
	return
}

func get(id uint64) {

}
